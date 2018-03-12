import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk'
import promise from 'redux-promise';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from 'redux/reducers';
import epics from './epics';
import { peerReceive } from './api';

import { DEVELOPED_MODE } from '../config';

const epicMiddleware = createEpicMiddleware(epics, {
  dependencies: {
    peerReceive
  }
});

const loggerMiddleware = createLogger();

let middlewares = null;
if(!DEVELOPED_MODE) {
	middlewares = [epicMiddleware, promise];
} else {
	middlewares = [epicMiddleware, promise, loggerMiddleware];
}

const storeEnhancer = [applyMiddleware(...middlewares)];

const persistConfig = {
  key: 'directories',
  storage
};

export const store = createStore(
  persistReducer(persistConfig, reducer),
  compose(...storeEnhancer)
);

export const persistor = persistStore(store);
