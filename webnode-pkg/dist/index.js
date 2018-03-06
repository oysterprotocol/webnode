"use strict";

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _redux = require("./src/redux");

var _redux2 = _interopRequireDefault(_redux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.myFunction = function () {
  console.log("when loaded as an npm module and called");
};

if (!module.parent) {
  console.log("when loaded as a script");
}