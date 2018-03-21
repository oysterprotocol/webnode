import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import { APP_START } from "../actions/action-types";
import { initWork } from "../actions/items-actions";

const startAppEpic = (action$, store) => {
  return action$
    .ofType(APP_START)
    .filter(() => false)
    .map(() => initWork());
};

export default combineEpics(startAppEpic);
