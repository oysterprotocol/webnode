import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import { IOTA_POW, IOTA_POW_SUCCESS } from "../actions/action-types";
import { requestPoWSuccess, powComplete } from "../actions/pow-actions";
import { attachToTangleCurl } from "../../services/iota";
import { broadcastToHooks } from "../../services/broadcast";

const powEpic = (action$, store) => {
  return action$.ofType(IOTA_POW).mergeMap(action => {
    const {
      branchTransaction,
      trunkTransaction,
      mwm,
      trytes,
      broadcastingNodes
    } = action.payload;
    return Observable.fromPromise(
      attachToTangleCurl({ branchTransaction, trunkTransaction, mwm, trytes })
    )
      .map(arrayOfTrytes =>
        requestPoWSuccess({ arrayOfTrytes, broadcastingNodes })
      )
      .catch(error => Observable.empty());
  });
};

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

export default combineEpics(powEpic, broadcastEpic);
