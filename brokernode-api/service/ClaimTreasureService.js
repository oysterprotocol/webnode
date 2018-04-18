'use strict';


/**
 * claimtreasure
 * claimtreasure
 *
 * body ClaimTreasure claimtreasure (optional)
 * returns List
 **/
exports.claimTreasure = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "item" : "success"
}, {
  "item" : "success"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

