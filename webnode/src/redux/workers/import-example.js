/**
 * All functions must be on self in web worker imported files.
 * The importScripts function adds to the global scope of the worker
 */

self.addNumbers = function(numOne, numTwo) {
  return numOne + numTwo
};