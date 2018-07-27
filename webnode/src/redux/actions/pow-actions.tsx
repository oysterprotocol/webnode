import { action } from "typesafe-actions";
import { RequestPoWType, RequestPoWSuccessType } from "../../types";

export const IOTA_POW = "directories/pow/iota_pow";
export const IOTA_POW_SUCCESS = "directories/pow/iota_pow_success";
export const IOTA_COMPLETE = "directories/pow/iota_complete";

const ACTIONS = Object.freeze({
  // actions
  IOTA_POW,
  IOTA_POW_SUCCESS,
  IOTA_COMPLETE,

  // actionCreators
  requestPoW: (obj: RequestPoWType) =>
    action(IOTA_POW, { payload: obj }),

  requestPoWSuccess: (obj: RequestPoWSuccessType) =>
    action(IOTA_POW_SUCCESS, { payload: obj }),

  powComplete: () => action(IOTA_COMPLETE)
});

export default ACTIONS;
