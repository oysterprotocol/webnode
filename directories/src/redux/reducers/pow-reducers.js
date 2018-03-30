import {
  IOTA_POW,
  IOTA_POW_SUCCESS,
  IOTA_COMPLETE
} from "../actions/pow-actions";

const initState = {
  powResults: [],
  statuses: ["Initializing"]
};

export default (state = initState, action) => {
  switch (action.type) {
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
