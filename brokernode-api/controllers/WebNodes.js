'use strict';

var utils = require('../utils/writer.js');
var WebNodes = require('../service/WebNodesService');

module.exports.addWebnode = function addWebnode (req, res, next) {
  var webNode = req.swagger.params['WebNode'].value;
  WebNodes.addWebnode(webNode)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
