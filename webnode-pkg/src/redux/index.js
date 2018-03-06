import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import { createEpicMiddleware } from "redux-observable";

import epics from "./epics";
import modules from "./modules";

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-enable */

const middleware = [
  process.env.NODE_ENV === `development` && createLogger(),
  createEpicMiddleware(epics)
].filter(x => !!x);

const store = createStore(modules, compose(applyMiddleware(...middleware)));

export default store;
