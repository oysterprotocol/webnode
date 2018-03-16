import { IOTA_POW, IOTA_POW_SUCCESS, IOTA_COMPLETE } from "./action-types";

export const requestPoW = ({
  branchTransaction,
  broadcastingNodes,
  mwm,
  trunkTransaction,
  trytes
}) => ({
  type: IOTA_POW,
  payload: {
    branchTransaction,
    broadcastingNodes,
    mwm,
    trunkTransaction,
    trytes
  }
});

export const requestPoWSuccess = ({ arrayOfTrytes, broadcastingNodes }) => ({
  type: IOTA_POW_SUCCESS,
  payload: { arrayOfTrytes, broadcastingNodes }
});

export const powComplete = () => ({
  type: IOTA_COMPLETE
});
