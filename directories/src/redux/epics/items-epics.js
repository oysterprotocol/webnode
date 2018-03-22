import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import {
  API_GIVE_PEER_ID,
  API_GIVE_PEER_ID_SUCCESS,
  API_START_TRANSACTION,
  API_START_TRANSACTION_SUCCESS
} from "../actions/action-types";
import {
  givePeerId,
  givePeerIdSuccess,
  startTransaction,
  startTransactionSuccess,
  selectItem
} from "../actions/items-actions";
import { requestPrepareTransfers } from "../actions/iota-actions";
import { peerInit } from "../api";

import {
  requestFetchItems,
  requestGivePeerId,
  requestStartTransaction,
  requestSelectItem
} from "../services";

const sendPeerId = (action$, store) => {
  return action$.ofType(API_GIVE_PEER_ID).mergeMap(action => {
    const peerId = action.payload;
    const params = { peerid: peerId };
    return Observable.fromPromise(requestGivePeerId(params))
      .map(givePeerIdSuccess)
      .catch(error => Observable.empty());
  });
};

const start = (action$, store) => {
  return action$.ofType(API_GIVE_PEER_ID_SUCCESS).mergeMap(action => {
    const params = { need_requested: "hi!Api" };
    return Observable.fromPromise(requestStartTransaction(params))
      .map(({ data: { txid, items } }) =>
        startTransactionSuccess({ txid, items })
      )
      .catch(error => Observable.empty());
  });
};

const select = (action$, store) => {
  return action$.ofType(API_START_TRANSACTION_SUCCESS).mergeMap(action => {
    const { txid, items } = action.payload;
    const params = { txid, itemIndex: 0 };

    return Observable.fromPromise(requestSelectItem(params))
      .map(({ data }) => {
        console.log("dataaaaaaaaaa: ", data);
        const {
          address,
          message,
          branchTransaction,
          trunkTransaction,
          broadcastingNodes
        } = data;
        return requestPrepareTransfers({
          seed:
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          address: address,
          message: message,
          broadcastingNodes,
          trunkTransaction,
          branchTransaction,
          tag: "EDMUNDANDREBELWUZHERE",
          value: 0
        });
      })
      .catch(error => Observable.empty());
  });
};

export default combineEpics(sendPeerId, start, select);
