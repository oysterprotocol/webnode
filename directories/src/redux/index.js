import { createStore, compose, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createEpicMiddleware } from "redux-observable";

import epics from "redux/epics";
import reducer from 'redux/reducers';

const persistConfig = {
  key: 'directories',
  storage
};

export const store = createStore(
  persistReducer(persistConfig, reducer),
  compose(applyMiddleware(createEpicMiddleware(epics)))
);

export const persistor = persistStore(store);
