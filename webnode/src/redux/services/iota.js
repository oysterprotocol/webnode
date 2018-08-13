import { IOTA_API_PROVIDER, IOTA_ADDRESS_LENGTH } from "../../config";
import subMinutes from "date-fns/sub_minutes";
import * as IotaPico from "@iota-pico/lib-browser";
import asciiToTrytes from "../../utils/asciiToTrytes";

const networkEndpoint = new IotaPico.NetworkEndPoint(
  "https",
  "broker-qa-2.oysternodes.com",
  14265
);
const networkClient = IotaPico.NetworkClientFactory.instance().create(
  "default",
  networkEndpoint
);
const apiClient = new IotaPico.ApiClient(networkClient);
const transactionClient = new IotaPico.TransactionClient(apiClient);

const MAX_TIMESTAMP_VALUE = (Math.pow(3, 27) - 1) / 2;

const toAddress = string => string.substr(0, IOTA_ADDRESS_LENGTH);

const findAllTransactions = address =>
  new Promise((resolve, reject) => {
    transactionClient.findTransactionObjects(
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

global.IotaPico = IotaPico;
global.transactionClient = transactionClient;

const prepareTransfers = data => {
  return new Promise((resolve, reject) => {
    console.log("xxxxxxxxxxxxxxx", data);
    global.data = data;
    global.transactionClient = transactionClient;
    transactionClient
      .prepareTransfers(new IotaPico.Hash(data.seed), [
        IotaPico.Transfer.fromParams(
          new IotaPico.Address(data.address),
          data.value,
          new IotaPico.Trytes(data.message),
          new IotaPico.Tag(data.tag)
        )
      ])
      .then(bundle => {
        console.log("IOTA prepareTransfers data ", bundle);
        resolve(bundle.transactions);
      })
      .catch(error => {
        console.log("IOTA prepareTransfers error ", error);
        reject(error);
      });
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
    // if (!iota.valid.isHash(trunkTransaction)) {
    // return callback(new Error("Invalid trunkTransaction"));
    // }
    // if (!iota.valid.isHash(branchTransaction)) {
    // return callback(new Error("Invalid branchTransaction"));
    // }
    // if (!iota.valid.isValue(minWeightMagnitude)) {
    // return callback(new Error("Invalid minWeightMagnitude"));
    // }
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
      let txObject = IotaPico.Transaction.fromTrytes(thisTrytes);
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
      let newTrytes = IotaPico.Transaction.toTrytes(txObject);
      const pow = new IotaPico.ProofOfWorkJs();
      pow
        .singlePow(newTrytes, minWeightMagnitude)
        .then(returnedTrytes => {
          // let returnedTrytes = newTrytes.substr(0, 2673 - 81).concat(nonce);
          // let newTxObject = IotaPico.Transaction.fromTrytes(returnedTrytes);
          // let txHash = newTxObject.hash;
          // previousTxHash = txHash;
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

export const getTransactionsToApprove = (depth, reference) => {
  return new Promise((resolve, reject) => {
    transactionClient.getTransactionsToApprove(
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
    transactionClient.broadcastTransactions(trytes, (error, success) => {
      error ? reject(error) : resolve(success);
    });
  });
};

export const attachToTangle = data => {
  return new Promise((resolve, reject) => {
    transactionClient
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
  prepareTransfers,
  localPow,
  checkIfClaimed,
  getTransactionsToApprove,
  broadcastTransactions,
  findMostRecentTransaction,
  utils: { toTrytes: asciiToTrytes.toTrytes },
  toAddress: toAddress
};
