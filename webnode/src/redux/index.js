import { createStore, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import promise from "redux-promise";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducers/index";
import epics from "./epics";

const DEVELOPMENT_MODE = process.env.NODE_ENV !== "production";
const DEBUGGING = process.env.DEBUG;

const epicMiddleware = createEpicMiddleware(epics);

const loggerMiddleware = createLogger();

let middlewares = null;
if (DEVELOPMENT_MODE) {
  middlewares = [epicMiddleware, promise, loggerMiddleware];
} else {
  middlewares = [epicMiddleware, promise, loggerMiddleware];
  // middlewares = [epicMiddleware, promise];
}

const storeEnhancer = [applyMiddleware(...middlewares)];

const persistConfig = {
  key: "directories",
  storage,
  whitelist: DEBUGGING ? [] : ["consent", "node", "treasureHunt"]
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistReducer(persistConfig, reducer),
  composeEnhancers(...storeEnhancer)
);

export const persistor = persistStore(store);
