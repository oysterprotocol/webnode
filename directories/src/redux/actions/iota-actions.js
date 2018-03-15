import {
  IOTA_PREPARE_TRANSFERS,
  IOTA_PREPARE_TRANSFERS_SUCCESS,
  IOTA_ATTACH_TO_TANGLE,
  IOTA_ATTACH_TO_TANGLE_SUCCESS
} from "./action-types";

export const requestPrepareTranfers = data => ({
  type: IOTA_PREPARE_TRANSFERS,
  payload: { data }
});

export const fullfillPrepareTranfers = data => ({
  type: IOTA_PREPARE_TRANSFERS_SUCCESS,
  payload: { data }
});

export const requestAttachToTangle = data => ({
  type: IOTA_ATTACH_TO_TANGLE,
  payload: { data }
});

export const fullfillAttachToTangle = data => ({
  type: IOTA_ATTACH_TO_TANGLE_SUCCESS,
  payload: { data }
});
