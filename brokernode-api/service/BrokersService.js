'use strict';


/**
 * Inform broker that the webnode has done
 *
 * id Long Node id
 * body List List of trytes
 * returns List
 **/
exports.informBroker = function(id,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "purchase" : "broker-node1.com",
  "id" : "tx1"
}, {
  "purchase" : "broker-node1.com",
  "id" : "tx1"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Inform broker that the webnode has done
 *
 * id Long Node id
 * body List List of trytes
 * returns List
 **/
exports.informBrokerGenesisHash = function(id,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "purchase" : "asdha;sljdflasjddeuyjhvbnbdrtyujk",
  "id" : "tx1"
}, {
  "purchase" : "asdha;sljdflasjddeuyjhvbnbdrtyujk",
  "id" : "tx1"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Register proof of work
 *
 * body List List of current brokernodes
 * returns List
 **/
exports.registerProofWork = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "pow" : {
    "branchTransaction" : "Branch transaction example",
    "address" : "Address example",
    "trunkTransaction" : "Trunk transaction example",
    "message" : "tx1"
  },
  "id" : true
}, {
  "pow" : {
    "branchTransaction" : "Branch transaction example",
    "address" : "Address example",
    "trunkTransaction" : "Trunk transaction example",
    "message" : "tx1"
  },
  "id" : true
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Register proof of work
 *
 * body List List of current genesis hashes
 * returns List
 **/
exports.registerProofWorkGenesisHash = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "pow" : {
    "branchTransaction" : "Branch transaction example",
    "address" : "Address example",
    "trunkTransaction" : "Trunk transaction example",
    "message" : "tx1"
  },
  "id" : true
}, {
  "pow" : {
    "branchTransaction" : "Branch transaction example",
    "address" : "Address example",
    "trunkTransaction" : "Trunk transaction example",
    "message" : "tx1"
  },
  "id" : true
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

