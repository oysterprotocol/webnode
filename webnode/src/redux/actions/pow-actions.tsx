import { ActionCreator } from "redux";
import {
  RequestPoWType,
  RequestPoWSuccessType,

  RequestPoWAction,
  RequestPoWSuccessAction,
  PowCompleteAction
} from "../../types";

export const IOTA_POW = "directories/pow/iota_pow";
export const IOTA_POW_SUCCESS = "directories/pow/iota_pow_success";
export const IOTA_COMPLETE = "directories/pow/iota_complete";

export const requestPoW: ActionCreator<RequestPoWAction> = (
  obj: RequestPoWType
) => ({
  type: IOTA_POW,
  payload: { obj }
});

export const requestPoWSuccess: ActionCreator<RequestPoWSuccessAction> = (
  obj: RequestPoWSuccessType
) => ({
  type: IOTA_POW_SUCCESS,
  payload: { obj }
});

export const powComplete: ActionCreator<PowCompleteAction> = () => ({
  type: IOTA_COMPLETE
});

const ACTIONS = Object.freeze({
  // actions
  IOTA_POW,
  IOTA_POW_SUCCESS,
  IOTA_COMPLETE,

  // actionCreators
  requestPoW,
  requestPoWSuccess,
  powComplete
});

export default ACTIONS;
