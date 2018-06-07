/**
 * NOTES
 *
 * BABEL LOADER INTERFERENCE
 *
 * Figured out that the babel loader was interfering with the worker loader. This threw me off for a long time!!!
 * If im using importScripts i get: The error is: Uncaught ReferenceError: importScripts is not defined
 * If im not using it and just trying to wire up onmessage i get: Uncaught TypeError: _iotaWorker2.default is not a constructor
 *
 * Once i was able to exclude the worker from the babel-loader, the web worker was successful
 *
 *
 * INLINE WEB WORKERS
 *
 * You can forgo the worker-loader config in the package.json if you use an inline loader with the following syntax
 * //import IotaWorker from 'worker-loader?name=iota-worker.js!../workers/iota-worker';
 */

import iota from "../services/iota";
//importScripts("../services/iota.js") // eslint-disable-line

onmessage = event => { // eslint-disable-line
  console.log("Message Recieved in Worker")
  console.log(self) // eslint-disable-line
}