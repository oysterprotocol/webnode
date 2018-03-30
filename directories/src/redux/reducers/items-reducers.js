import {
  API_GIVE_PEER_ID,
  API_START_TRANSACTION,
  API_SELECT_ITEM
} from "../actions/action-types";

import { API_REQUEST_ERROR } from "../../config/";

const initState = {
  transaction: { txId: "", items: [] },
  item: {}
};

export default (state = initState, action) => {
  let payload = null;
  if (action.payload) {
    payload = action.payload;
  }

  if (payload !== null) {
    switch (action.type) {
      case API_START_TRANSACTION:
        return {
          ...state,
          transaction: { txId: payload.data.txtid, items: payload.data.items }
        };

      case API_SELECT_ITEM:
        return { ...state, item: payload.data.data };

      default:
        return state;
    }
  }
  return state;
};
