export const IOTA_POW = "directories/pow/iota_pow";
export const IOTA_POW_SUCCESS = "directories/pow/iota_pow_success";
export const IOTA_COMPLETE = "directories/pow/iota_complete";

const ACTIONS = Object.freeze({
  // actions
  IOTA_POW,
  IOTA_POW_SUCCESS,
  IOTA_COMPLETE,

  // actionCreators
  requestPoW: ({
    branchTx,
    broadcastingNodes,
    mwm,
    trunkTx,
    trytes
  }) => ({
    type: IOTA_POW,
    payload: {
      branchTx,
      broadcastingNodes,
      mwm,
      trunkTx,
      trytes
    }
  }),
  requestPoWSuccess: ({ arrayOfTrytes, broadcastingNodes }) => ({
    type: IOTA_POW_SUCCESS,
    payload: { arrayOfTrytes, broadcastingNodes }
  }),
  powComplete: () => ({
    type: IOTA_COMPLETE
  })
});

export default ACTIONS;
