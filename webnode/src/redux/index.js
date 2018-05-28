import { createStore, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import thunk from "redux-thunk";
import promise from "redux-promise";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducers/index";
import epics from "./epics";

import { DEVELOPED_MODE } from "../config";

const epicMiddleware = createEpicMiddleware(epics);

const loggerMiddleware = createLogger();

let middlewares = null;
if (!DEVELOPED_MODE) {
  middlewares = [epicMiddleware, promise];
} else {
  middlewares = [epicMiddleware, promise, loggerMiddleware];
}

const storeEnhancer = [applyMiddleware(...middlewares)];

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
