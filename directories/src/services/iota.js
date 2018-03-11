import IOTA from "iota.lib.js";
import { IOTA_API_PROVIDER } from "../config";
import curl from "curl.lib.js";

export const iotaInstance = new IOTA();

export const iota = new IOTA({
  provider: IOTA_API_PROVIDER
});

curl.init();
curl.overrideAttachToTangle(iota);

export const prepareTransfers = data => {
  return new Promise((resolve, reject) => {
    iota.api.prepareTransfers(
      data.seed,
      [
        {
          address: data.address,
          value: data.value,
          message: data.message,
          tag: data.tag
        }
      ],
      (error, prepareTransfers) => {
        if (error) {
          console.log("IOTA prepareTransfers error ", error);
        } else {
          console.log("IOTA prepareTransfers data ", prepareTransfers);
          resolve(prepareTransfers);
        }
      }
    );
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
