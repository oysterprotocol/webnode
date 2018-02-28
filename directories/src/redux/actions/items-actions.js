import {
  API_FETCH_ITEMS,
  API_GIVE_PEER_ID,
  API_START_TRANSACTION,
  API_SELECT_NEED
} from './action-types';

import { 
  requestFetchItems,
  requestGivePeerId,
  requestStartTransaction,
  requestSelectNeed 
} from '../api';

export const fetchItemsRequest = (needle = '') => {
  const request = requestFetchItems(needle);
  return {
    type: API_FETCH_ITEMS,
    payload: request
  };
};

export const givePeerId = (data = '') => {
  const request = requestGivePeerId(data);
  return {
    type: API_GIVE_PEER_ID,
    payload: request
  };
};

export const startTransaction = (data = '') => {
  const request = requestStartTransaction(data);
  return {
    type: API_START_TRANSACTION,
    payload: request
  };
};

export const selectNeed = (data = '') => {
  const request = requestSelectNeed(data);
  return {
    type: API_SELECT_NEED,
    payload: request
  };
};
