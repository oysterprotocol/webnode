import {
  API_FETCH_ITEMS,
  API_GIVE_PEER_ID,
  API_START_TRANSACTION,
  API_SELECT_ITEM,
  API_CONFIRM_WORK,
  API_BROADCAST_TO_HOOKS
} from "./action-types";

import {
  requestFetchItems,
  requestGivePeerId,
  requestStartTransaction,
  requestSelectItem,
  requestConfirmWork,
  requestBroadcastToHooks
} from "../services";

export const fetchItemsRequest = (needle = "") => {
  const request = requestFetchItems(needle);
  return {
    type: API_FETCH_ITEMS,
    payload: request
  };
};

export const givePeerId = (data = "") => {
  const request = requestGivePeerId(data);
  return {
    type: API_GIVE_PEER_ID,
    payload: request
  };
};

export const startTransaction = (data = "") => {
  const request = requestStartTransaction(data);
  return {
    type: API_START_TRANSACTION,
    payload: request
  };
};

export const selectItem = (data = "") => {
  const request = requestSelectItem(data);
  return {
    type: API_SELECT_ITEM,
    payload: request
  };
};

export const confirmWork = (data = "") => {
  const request = requestConfirmWork(data);
  return {
    type: API_CONFIRM_WORK,
    payload: request
  };
};

export const broadcastToHooks = (trytes, nodes) => {
  const request = requestBroadcastToHooks(trytes, nodes);
  return {
    type: API_BROADCAST_TO_HOOKS,
    payload: request
  };
};


