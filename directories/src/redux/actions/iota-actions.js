import {
  IOTA_PREPARE_TRANSFERS,
  IOTA_PREPARE_TRANSFERS_SUCCESS
} from "./action-types";

export const requestPrepareTransfers = ({
  address,
  message,
  tag,
  value,
  seed
}) => ({
  type: IOTA_PREPARE_TRANSFERS,
  payload: { address, message, tag, value, seed }
});

export const fulfillPrepareTransfers = payload => ({
  type: IOTA_PREPARE_TRANSFERS_SUCCESS,
  payload
});
