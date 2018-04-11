import IOTA from "iota.lib.js";
import { IOTA_API_PROVIDER } from "../../config";
import curl from "curl.lib.js";

const iota = new IOTA();

const providerIota = new IOTA({
  provider: IOTA_API_PROVIDER
});

curl.init();
const MAX_TIMESTAMP_VALUE = (Math.pow(3, 27) - 1) / 2;

const prepareTransfers = data => {
  return new Promise((resolve, reject) => {
    providerIota.api.prepareTransfers(
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

export const attachToTangle = data => {
  const trunkTransaction = data.trunkTransaction;
  const branchTransaction = data.branchTransaction;
  const minWeightMagnitude = data.mwm;
  const trytes = data.trytes;
  const callback = data.callback;

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

export default {
  prepareTransfers,
  attachToTangle
};
