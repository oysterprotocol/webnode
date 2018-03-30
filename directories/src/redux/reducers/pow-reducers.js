import {
  API_GIVE_PEER_ID,
  IOTA_PREPARE_TRANSFERS,
  IOTA_POW,
  IOTA_POW_SUCCESS,
  IOTA_COMPLETE
} from "../actions/action-types";

const initState = {
  powResults: [],
  statuses: ["Initializing"]
};

export default (state = initState, action) => {
  switch (action.type) {
    case IOTA_POW_SUCCESS:
      return {
        ...state,
        powResults: [action.payload]
      };
    case API_GIVE_PEER_ID:
      return {
        ...state,
        statuses: [...state.statuses, "Transacting with brokernode"]
      };
    case IOTA_PREPARE_TRANSFERS:
      return {
        ...state,
        statuses: [...state.statuses, "Preparing transfers"]
      };
    case IOTA_POW:
      return {
        ...state,
        statuses: [...state.statuses, "Doing proof of work"]
      };
    case IOTA_POW_SUCCESS:
      return {
        ...state,
        statuses: [...state.statuses, "Broadcasting"]
      };
    case IOTA_COMPLETE:
      return {
        ...state,
        statuses: [...state.statuses, "Complete"]
      };

    default:
      return state;
  }
};
