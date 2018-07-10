import IOTA from "iota.lib.js";
import { IOTA_API_PROVIDER, IOTA_ADDRESS_LENGTH } from "../../config";
import curl from "curl.lib.js";
import subMinutes from "date-fns/sub_minutes";

const iota = new IOTA();

const iotaProvider = new IOTA({
  provider: IOTA_API_PROVIDER
});


try {
  curl.init();
} catch(e) {
  console.log("ERROR INITIALIZING CURL: ", e);
}

const MAX_TIMESTAMP_VALUE = (Math.pow(3, 27) - 1) / 2;

const toAddress = string => string.substr(0, IOTA_ADDRESS_LENGTH);

const parseMessage = message => {
  const characters = message.split("");
  const reversedCharacters = [...characters].reverse();
  const notNineIndexReversed = reversedCharacters.findIndex(c => c !== "9");
  const notNineIndex = characters.length - notNineIndexReversed - 1;

  const choppedArray = characters.slice(0, notNineIndex + 1);
  const choppedMessage = choppedArray.join("");

  const evenChars =
    choppedMessage.length % 2 === 0 ? choppedMessage : choppedMessage + "9";

  return iota.utils.fromTrytes(evenChars);
};

const findAllTransactions = address =>
  new Promise((resolve, reject) => {
    iotaProvider.api.findTransactionObjects(
      { addresses: [address] },
      (error, transactionObjects) => {
        const settledTransactions = transactionObjects || [];
        const ordered = settledTransactions.sort(
          (a, b) => b.attachmentTimestamp - a.attachmentTimestamp
        );

        console.log("IOTA TRANSACTIONS: ", ordered);
        resolve(ordered);
      }
    );
  });

const checkIfClaimed = address =>
  findAllTransactions(address).then(transactions => {
    if (!transactions.length) return false;

    const mostRecentTransaction = transactions[0];

    const workedOnByOtherWebnode = transactions.length > 1;

    const attachedAt = mostRecentTransaction.attachmentTimestamp;
    const lastEpoch = subMinutes(new Date(), 1).valueOf();
    const afterLastEpoch = lastEpoch < attachedAt;

    return workedOnByOtherWebnode && afterLastEpoch;
  });

const findMostRecentTransaction = address =>
  findAllTransactions(address).then(transactions => transactions[0]);

const prepareTransfers = data => {
  return new Promise((resolve, reject) => {
    iotaProvider.api.prepareTransfers(
      data.seed,
      [
        {
          address: data.address,
          value: data.value,
          message: data.message,
          tag: data.tag
        }
      ],
      (error, arrayOfTrytes) => {
        if (error) {
          console.log("IOTA prepareTransfers error ", error);
          reject(error);
        } else {
          console.log("IOTA prepareTransfers data ", arrayOfTrytes);
          resolve(arrayOfTrytes);
        }
      }
    );
  });
};

export const localPow = data => {
  const trunkTransaction = data.trunkTx;
  const branchTransaction = data.branchTx;
  const minWeightMagnitude = data.mwm;
  const trytes = data.trytes;

  const curlHashing = (
    trunkTransaction,
    branchTransaction,
    minWeightMagnitude,
    trytes,
    callback
  ) => {
    if (!iota.valid.isHash(trunkTransaction)) {
      return callback(new Error("Invalid trunkTransaction"));
    }
    if (!iota.valid.isHash(branchTransaction)) {
      return callback(new Error("Invalid branchTransaction"));
    }
    if (!iota.valid.isValue(minWeightMagnitude)) {
      return callback(new Error("Invalid minWeightMagnitude"));
    }
    let finalBundleTrytes = [];
    let previousTxHash;
    let i = 0;

    function loopTrytes() {
      getBundleTrytes(trytes[i], function(error) {
        if (error) {
          return callback(error);
        } else {
          i++;
          if (i < trytes.length) {
            loopTrytes();
          } else {
            return callback(null, finalBundleTrytes.reverse());
          }
        }
      });
    }

    function getBundleTrytes(thisTrytes, callback) {
      let txObject = iota.utils.transactionObject(thisTrytes);

      /*Commenting this out.  We potentially want to be able to search
            using tags, at least until mainnet comes out.*/

      //txObject.tag = txObject.obsoleteTag;

      txObject.attachmentTimestamp = Date.now();
      txObject.attachmentTimestampLowerBound = 0;
      txObject.attachmentTimestampUpperBound = MAX_TIMESTAMP_VALUE;
      if (!previousTxHash) {
        if (txObject.lastIndex !== txObject.currentIndex) {
          return callback(
            new Error(
              "Wrong bundle order. The bundle should be ordered in descending order from currentIndex"
            )
          );
        }
        txObject.trunkTransaction = trunkTransaction;
        txObject.branchTransaction = branchTransaction;
      } else {
        txObject.trunkTransaction = previousTxHash;
        txObject.branchTransaction = trunkTransaction;
      }
      let newTrytes = iota.utils.transactionTrytes(txObject);
      curl
        .pow({ trytes: newTrytes, minWeight: minWeightMagnitude })
        .then(nonce => {
          let returnedTrytes = newTrytes.substr(0, 2673 - 81).concat(nonce);
          let newTxObject = iota.utils.transactionObject(returnedTrytes);
          let txHash = newTxObject.hash;
          previousTxHash = txHash;
          finalBundleTrytes.push(returnedTrytes);
          callback(null);
        })
        .catch(callback);
    }

    loopTrytes();
  };
  return new Promise((resolve, reject) => {
    curlHashing(
      trunkTransaction,
      branchTransaction,
      minWeightMagnitude,
      trytes,
      (error, powResults) => {
        if (error) {
          return reject(error);
        } else {
          resolve(powResults);
        }
      }
    );
  });
};

iota.api.attachToTangle = localPow;

export const getTransactionsToApprove = (depth, reference) => {
  return new Promise((resolve, reject) => {
    iotaProvider.api.getTransactionsToApprove(
      depth,
      reference,
      (error, transactions) => {
        error ? reject(error) : resolve(transactions);
      }
    );
  });
};

export const broadcastTransactions = trytes => {
  return new Promise((resolve, reject) => {
    iotaProvider.api.broadcastTransactions(trytes, (error, success) => {
      error ? reject(error) : resolve(success);
    });
  });
};

export const attachToTangle = data => {
  return new Promise((resolve, reject) => {
    iota.api
      .attachToTangle(
        data.trunkTransaction,
        data.branchTransaction,
        data.minWeight,
        data.trytes,
        (error, attachToTangle) => {
          if (error) {
            console.log("IOTA attachToTangle error ", error);
          } else {
            console.log("IOTA attachToTangle data ", attachToTangle);
            resolve(attachToTangle);
          }
        }
      )
      .then(nonce => {
        console.log(
          "attachToTangle nonce ",
          data.tryte.substr(0, 2187 - 81).concat(nonce)
        );
      })
      .catch(error => {
        console.log("attachToTangle error ", error);
      });
  });
};

export default {
  parseMessage,
  prepareTransfers,
  localPow,
  checkIfClaimed,
  getTransactionsToApprove,
  broadcastTransactions,
  findMostRecentTransaction,
  utils: iota.utils,
  toAddress: toAddress
};
