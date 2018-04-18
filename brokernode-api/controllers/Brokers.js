'use strict';

var utils = require('../utils/writer.js');
var Brokers = require('../service/BrokersService');

module.exports.informBroker = function informBroker (req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Brokers.informBroker(id,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.informBrokerGenesisHash = function informBrokerGenesisHash (req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Brokers.informBrokerGenesisHash(id,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.registerProofWork = function registerProofWork (req, res, next) {
  var body = req.swagger.params['body'].value;
  Brokers.registerProofWork(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.registerProofWorkGenesisHash = function registerProofWorkGenesisHash (req, res, next) {
  var body = req.swagger.params['body'].value;
  Brokers.registerProofWorkGenesisHash(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
