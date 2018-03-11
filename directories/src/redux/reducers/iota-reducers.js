import {
  IOTA_PREPARE_TRANSFERS_SUCCESS,
  IOTA_ATTACH_TO_TANGLE_SUCCESS
} from "../actions/action-types";

const initState = {
  iotaPrepareTransfers: [],
  iotaAttachToTangle: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case IOTA_PREPARE_TRANSFERS_SUCCESS:
      return {
        ...state,
        iotaPrepareTransfers: [...state.iotaPrepareTransfers, action.payload]
      };
    case IOTA_ATTACH_TO_TANGLE_SUCCESS:
      return {
        ...state,
        iotaAttachToTangle: [...state.iotaAttachToTangle, action.payload]
      };

    default:
      return state;
  }
};
