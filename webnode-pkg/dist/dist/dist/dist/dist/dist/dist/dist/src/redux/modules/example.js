'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exampleActions = exports.EXAMPLE_ACTIONS = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var EXAMPLE_ACTIONS = exports.EXAMPLE_ACTIONS = Object.freeze({
  INCREMENT: _config2.default.APP_NAME + '/example/increment'
});

var exampleActions = exports.exampleActions = Object.freeze({
  increment: function increment() {
    return { type: EXAMPLE_ACTIONS.INCREMENT };
  }
});

/**
 * Reducer
 */

var initState = { counter: 0 };

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
  var action = arguments[1];

  switch (action.type) {
    case EXAMPLE_ACTIONS.INCREMENT:
      return _extends({}, state, { counter: state.counter + 1 });
    default:
      return state;
  }
};

exports.default = reducer;