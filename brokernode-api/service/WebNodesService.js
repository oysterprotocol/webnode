'use strict';


/**
 * Register a new webnode
 * Register a new webnode
 *
 * webNode WebNode Register new webnode (optional)
 * returns Object
 **/
exports.addWebnode = function(webNode) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "{}";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

