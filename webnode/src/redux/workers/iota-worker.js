/**
 * We should ignore worker files in the eslint loader
 */
/* eslint-disable */

importScripts("import-example.js");

onmessage = event => {
  console.log("Message Recieved in Worker");
  console.log(event);
  console.log(self.addNumbers(1, 2));
};
/* eslint-disable */

/**
 * Example of how to use worker, delete this worker when an example is implemented
 */
/*
import IotaWorker from '../workers/iota-worker';

console.log("CREATE WEB WORKER")
const iotaWorker = new IotaWorker;

if (iotaWorker) {
  console.log("Post Worker Message");
  iotaWorker.postMessage("Web worker message");
}
*/
