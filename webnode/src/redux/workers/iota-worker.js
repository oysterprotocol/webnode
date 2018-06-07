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


/**
 * If you enable the line below you will get a window not defined error because
 * workers run in another global context that is different from the current
 * window. Thus, using the window shortcut to get the current global scope (instead of self) within a Worker will return an error.
 */
//import iota from "../services/iota";


/** npm start
 * If you enable the line below you will get a "Uncaught SyntaxError: Unexpected token <" error
 * When the file is attempted to be fetched, the index.html file is returned.
 * I think once this returns successfully, functions from iota.js will be on the scope
 */

/** npm start-webpack
 * If you enable the line below you will get a "GET http://localhost:8080/services/iota.js 404 (Not Found)" error
 * When the file is attempted to be fetched, the index.html file is returned.
 * I think once this returns successfully, functions from iota.js will be on the scope
 */
//importScripts("../services/iota.js")

onmessage = event => { // eslint-disable-line
  console.log("Message Recieved in Worker")
  console.log(self)
}