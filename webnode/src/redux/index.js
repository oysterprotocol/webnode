import { createStore, compose, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import promise from "redux-promise";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "redux/reducers";

import { DEVELOPED_MODE } from "../config";
import { workerMiddleware, epicMiddleware, loggerMiddleware } from "./middlewares";

let middlewares = null;
if (!DEVELOPED_MODE) {
  middlewares = [workerMiddleware, epicMiddleware, promise];
} else {
  middlewares = [workerMiddleware, epicMiddleware, promise, loggerMiddleware];
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
