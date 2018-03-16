import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import { IOTA_POW, IOTA_POW_SUCCESS } from "../actions/action-types";
import { fulfillPoW, powComplete } from "../actions/pow-actions";
import { attachToTangleCurl } from "../../services/iota";
import { broadcastToHooks } from "../../services/broadcast";

const powEpics = (action$, store) => {
  return action$.ofType(IOTA_POW).mergeMap(action => {
    const { branchTransaction, trunkTransaction, mwm, trytes } = action.payload;
    return Observable.fromPromise(
      attachToTangleCurl({ branchTransaction, trunkTransaction, mwm, trytes })
    )
      .map(powResults => fulfillPoW(powResults))
      .catch(error => Observable.empty());
  });
};

const broadcast = (action$, store) => {
  return action$.ofType(IOTA_POW_SUCCESS).mergeMap(action => {
    const data = action.payload;
    let hardcodedHooks = ["54.208.39.116"];

    return Observable.fromPromise(
      broadcastToHooks({ trytes: data }, hardcodedHooks)
    )
      .map(powResults => {
        console.log("booyaaaaaaaaaaaaaa");
        return powComplete();
      })
      .catch(error => Observable.empty());
  });
};

export default combineEpics(powEpics);
