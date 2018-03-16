import {
  API_INIT_WORK,
  API_GIVE_PEER_ID,
  API_GIVE_PEER_ID_SUCCESS,
  API_START_TRANSACTION,
  API_START_TRANSACTION_SUCCESS,
  API_SELECT_ITEM
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

export const givePeerIdSuccess = () => ({
  type: API_GIVE_PEER_ID_SUCCESS
});

export const startTransaction = ({ need_requested }) => ({
  type: API_START_TRANSACTION,
  payload: { need_requested }
});

export const startTransactionSuccess = ({ txid, items }) => ({
  type: API_START_TRANSACTION_SUCCESS,
  payload: { txid, items }
});

export const selectItem = item => ({
  type: API_SELECT_ITEM,
  payload: item
});
