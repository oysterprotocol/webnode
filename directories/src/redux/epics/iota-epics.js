import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import {
  IOTA_PREPARE_TRANSFERS,
  IOTA_PREPARE_TRANSFERS_SUCCESS
} from "../actions/action-types";
import { requestPrepareTransfersSuccess } from "../actions/iota-actions";
import { requestPoW } from "../actions/pow-actions";
import { prepareTransfers } from "../../services/iota";

const prepareTransfersEpic = (action$, store) => {
  return action$.ofType(IOTA_PREPARE_TRANSFERS).mergeMap(action => {
    const {
      address,
      message,
      value,
      tag,
      seed,
      broadcastingNodes,
      branchTransaction,
      trunkTransaction
    } = action.payload;

    return Observable.fromPromise(
      prepareTransfers({ address, message, value, tag, seed })
    )
      .map(arrayOfTrytes =>
        requestPrepareTransfersSuccess({
          arrayOfTrytes,
          broadcastingNodes,
          branchTransaction,
          trunkTransaction
        })
      )
      .catch(error => Observable.empty());
  });
};

const requestPow = (action$, store) => {
  return action$.ofType(IOTA_PREPARE_TRANSFERS_SUCCESS).map(action => {
    const {
      arrayOfTrytes,
      broadcastingNodes,
      branchTransaction,
      trunkTransaction
    } = action.payload;
    const pow = {
      trunkTransaction,
      branchTransaction,
      broadcastingNodes,
      mwm: 14,
      trytes: arrayOfTrytes
    };
    return requestPoW(pow);
  });
};

export default combineEpics(prepareTransfersEpic, requestPow);
