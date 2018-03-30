import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import powActions from "../actions/pow-actions";
import { broadcastToHooks } from "../services/broadcast";

const broadcastEpic = (action$, store) => {
  return action$.ofType(powActions.IOTA_POW_SUCCESS).mergeMap(action => {
    const { arrayOfTrytes, broadcastingNodes } = action.payload;
    let hardcodedHooks = ["54.208.39.116"];

    return Observable.fromPromise(
      broadcastToHooks({ trytes: arrayOfTrytes }, broadcastingNodes)
    )
      .map(powActions.powComplete)
      .catch(error => Observable.empty());
  });
};

export default combineEpics(broadcastEpic);
