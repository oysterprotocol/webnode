import {
  API_INIT_WORK,
  API_FETCH_ITEMS,
  API_GIVE_PEER_ID,
  API_START_TRANSACTION,
  API_SELECT_NEED
} from "./action-types";

import {
  requestFetchItems,
  requestGivePeerId,
  requestStartTransaction,
  requestSelectNeed
} from "../services";

export const initWork = () => ({
  type: API_INIT_WORK
});

export const givePeerId = peerId => ({
  type: API_GIVE_PEER_ID,
  payload: peerId
});

export const startTransaction = data => ({
  type: API_START_TRANSACTION,
  payload: data
});

export const selectItem = item => ({
  type: API_SELECT_NEED,
  payload: item
});
