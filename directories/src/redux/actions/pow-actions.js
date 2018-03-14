import { IOTA_POW, IOTA_POW_SUCCESS, IOTA_COMPLETE } from "./action-types";

export const requestPoW = data => ({
  type: IOTA_POW,
  payload: { data }
});

export const fulfillPoW = payload => ({
  type: IOTA_POW_SUCCESS,
  payload
});

export const powComplete = () => ({
  type: IOTA_COMPLETE
});
