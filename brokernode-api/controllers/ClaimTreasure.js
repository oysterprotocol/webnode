'use strict';

var utils = require('../utils/writer.js');
var ClaimTreasure = require('../service/ClaimTreasureService');

module.exports.claimTreasure = function claimTreasure (req, res, next) {
  var body = req.swagger.params['body'].value;
  ClaimTreasure.claimTreasure(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
