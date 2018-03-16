import {
  IOTA_PREPARE_TRANSFERS,
  IOTA_PREPARE_TRANSFERS_SUCCESS
} from "./action-types";

export const requestPrepareTransfers = ({
  address,
  message,
  broadcastingNodes,
  branchTransaction,
  trunkTransaction,
  tag,
  value,
  seed
}) => ({
  type: IOTA_PREPARE_TRANSFERS,
  payload: {
    address,
    message,
    broadcastingNodes,
    tag,
    value,
    seed,
    branchTransaction,
    trunkTransaction
  }
});

export const requestPrepareTransfersSuccess = ({
  arrayOfTrytes,
  broadcastingNodes,
  trunkTransaction,
  branchTransaction
}) => ({
  type: IOTA_PREPARE_TRANSFERS_SUCCESS,
  payload: {
    arrayOfTrytes,
    broadcastingNodes,
    trunkTransaction,
    branchTransaction
  }
});
