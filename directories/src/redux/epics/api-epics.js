import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import {
  API_INIT_WORK,
  API_GIVE_PEER_ID,
  API_START_TRANSACTION,
  API_SELECT_ITEM,
  API_BROADCAST_TO_HOOKS,
  API_CONFIRM_WORK
} from "../actions/action-types";
import {
  givePeerId,
  startTransaction,
  selectItem,
  broadcastToHooks,
  fullfillBroadcastToHooks
  confirmWork
} from "../actions/api-actions";
import { requestPrepareTransfers } from "../actions/iota-actions";
import { peerInit } from "../api";

import {
  requestFetchItems,
  requestGivePeerId,
  requestStartTransaction,
  requestSelectItem,
  requestBroadcastToHooks,
  requestConfirmWork
} from "../services";

const initWork = (action$, store) => {
  return action$.ofType(API_INIT_WORK).map(action => {
    const peer = peerInit();
    return givePeerId(peer.id);
  });
};

const sendPeerId = (action$, store) => {
  return action$.ofType(API_GIVE_PEER_ID).mergeMap(action => {
    const peerId = action.payload;
    const params = { peerid: peerId };
    return Observable.fromPromise(requestGivePeerId(params))
      .map(({ data }) => startTransaction(data))
      .catch(error => Observable.empty());
  });
};

const start = (action$, store) => {
  return action$.ofType(API_START_TRANSACTION).mergeMap(action => {
    const params = { need_requested: "hi!Api" };
    return Observable.fromPromise(requestStartTransaction(params))
      .map(({ data }) => selectItem(data))
      .catch(error => Observable.empty());
  });
};

const select = (action$, store) => {
  return action$.ofType(API_SELECT_ITEM).mergeMap(action => {
    const params = { txid: "hi!Api", itemIndex: 0 };

    // TODO: remove and use actual data from response
    const FAKE_DATA = {
      seed:
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      address:
        "OYSTERWEBNODEWORKSOYSTERWEBNODEWORKSOYSTERWEBNODEWORKSOYSTERWEBNODEWORKSOYSTERWEB",
      value: 0,
      message: "SOMECOOLMESSAGE",
      tag: "OYSTERWEBNODEWORKING"
    };

    return Observable.fromPromise(requestSelectItem(params))
      .map(({ data }) => requestPrepareTransfers(FAKE_DATA))
      .catch(error => Observable.empty());
  });
};

const broadcastToHooks = (action$, store) => {
return action$.ofType(API_BROADCAST_TO_HOOKS).mergeMap(action => {
    console.log('broadcast-trytes', action.payload.trytes);
    console.log('broadcast-nodes',action.payload.nodes);
    return Observable.fromPromise(requestBroadcastToHooks(action.payload.trytes, action.payload.nodes);)
      .map(({ data }) => fullfillBroadcastToHooks(data))
      .catch(error => Observable.empty());
  });
};

const confirmWork = (action$, store) => {
return action$.ofType(API_CONFIRM_WORK).mergeMap(action => {
    return Observable.fromPromise(requestConfirmWork(data);)
      .map(({ data }) => confirmWork(data))
      .catch(error => Observable.empty());
  });
};

export default combineEpics(initWork, sendPeerId, start, select, broadcastToHooks, confirmWork);
