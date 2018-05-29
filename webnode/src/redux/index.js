import { createStore, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import promise from "redux-promise";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Raven from "raven-js";
import createRavenMiddleware from "raven-for-redux";

import { SENTRY_DSN } from "../config";
import reducer from "./reducers/index";
import epics from "./epics";

const IS_DEV = process.env.NODE_ENV === "development";

Raven.config(SENTRY_DSN).install();

const middleware = [
  IS_DEV && createLogger(),
  createEpicMiddleware(epics),
  promise,
  createRavenMiddleware(Raven, {})
].filter(x => !!x);

const storeEnhancer = [applyMiddleware(...middleware)];

const persistConfig = {
  key: "directories",
  storage,
  whitelist: []
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistReducer(persistConfig, reducer),
  composeEnhancers(...storeEnhancer)
);

export const persistor = persistStore(store);
