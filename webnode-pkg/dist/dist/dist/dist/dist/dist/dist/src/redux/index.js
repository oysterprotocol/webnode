'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduxLogger = require('redux-logger');

var _reduxObservable = require('redux-observable');

var _epics = require('./epics');

var _epics2 = _interopRequireDefault(_epics);

var _modules = require('./modules');

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
var composeFn = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
/* eslint-enable */

var middleware = [process.env.NODE_ENV === 'development' && (0, _reduxLogger.createLogger)(), (0, _reduxObservable.createEpicMiddleware)(_epics2.default)].filter(function (x) {
  return !!x;
});

var store = (0, _redux.createStore)(_modules2.default, composeFn(_redux.applyMiddleware.apply(undefined, _toConsumableArray(middleware))));

exports.default = store;