import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import powActions from "../actions/pow-actions";
import brokerNode from "../services/brokernode";

const broadcastEpic = (action$, store) => {
  return action$.ofType(powActions.IOTA_POW_SUCCESS).mergeMap(action => {
    const { arrayOfTrytes, broadcastingNodes } = action.payload;

    return Observable.fromPromise(
      brokerNode.broadcastToHooks({ trytes: arrayOfTrytes }, broadcastingNodes)
    )
      .map(powActions.powComplete)
      .catch(error => Observable.empty());
  });
};

export default combineEpics(broadcastEpic);
