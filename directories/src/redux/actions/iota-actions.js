import {
  IOTA_PREPARE_TRANSFERS,
  IOTA_PREPARE_TRANSFERS_SUCCESS
} from "./action-types";

export const requestPrepareTransfers = data => ({
  type: IOTA_PREPARE_TRANSFERS,
  payload: { data }
});

export const fulfillPrepareTransfers = payload => ({
  type: IOTA_PREPARE_TRANSFERS_SUCCESS,
  payload
});
