import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import {
  IOTA_PREPARE_TRANSFERS,
  IOTA_ATTACH_TO_TANGLE
} from "../actions/action-types";
import { fullfillPrepareTranfers, fullfillAttachToTangle } from "../actions/iota-actions";
import { prepareTransfers, attachToTangle } from "../../services/iota";

const prepareTransfersEpics = (action$, store) => {
  return action$.ofType(IOTA_PREPARE_TRANSFERS).mergeMap(action => {
    const { data } = action.payload;
    console.log("IOTA TransferPrepareEpics", data);
    return Observable.fromPromise(prepareTransfers(data))
      .map(prepareTransfers => fullfillPrepareTranfers({ prepareTransfers }))
      .catch(error => Observable.empty());
  });
};

const attachToTangleEpics = (action$, store) => {
  return action$.ofType(IOTA_ATTACH_TO_TANGLE).mergeMap(action => {
    const { data } = action.payload;
    console.log("IOTA AttachToTangleEpics", data);
    return Observable.fromPromise(attachToTangle(data))
      .map(attachToTangle => fullfillAttachToTangle({ attachToTangle }))
      .catch(error => Observable.empty());
  });
};

export default combineEpics(prepareTransfersEpics, attachToTangleEpics);
