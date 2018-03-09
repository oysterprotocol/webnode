import {
  IOTA_PREPARE_TRANSFERS,
  IOTA_PREPARE_TRANSFERS_SUCCESS,
  IOTA_POW,
  IOTA_POW_SUCCESS,
} from './action-types';

export const requestPrepareTransfers = (data) => ({
  type: IOTA_PREPARE_TRANSFERS,
  payload: { data }
});

export const fulfillPrepareTransfers = payload => ({
  type: IOTA_PREPARE_TRANSFERS_SUCCESS,
  payload
});

export const requestPoW = (data) => ({
    type: IOTA_POW,
    payload: { data }
});

export const fulfillRequestPoW = payload => ({
    type: IOTA_POW_SUCCESS,
    payload
});
