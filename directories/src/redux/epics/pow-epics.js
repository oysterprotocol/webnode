import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import { IOTA_POW_SUCCESS } from "../actions/action-types";
import { powComplete } from "../actions/pow-actions";
import { broadcastToHooks } from "../../services/broadcast";

const broadcastEpic = (action$, store) => {
  return action$.ofType(IOTA_POW_SUCCESS).mergeMap(action => {
    const { arrayOfTrytes, broadcastingNodes } = action.payload;
    let hardcodedHooks = ["54.208.39.116"];

    return Observable.fromPromise(
      broadcastToHooks({ trytes: arrayOfTrytes }, broadcastingNodes)
    )
      .map(powResults => {
        console.log("booyaaaaaaaaaaaaaa");
        return powComplete();
      })
      .catch(error => Observable.empty());
  });
};

export default combineEpics(broadcastEpic);
