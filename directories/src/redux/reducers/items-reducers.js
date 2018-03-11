import {
  API_GIVE_PEER_ID,
  API_START_TRANSACTION,
  API_SELECT_ITEM
} from "../actions/action-types";

import { API_REQUEST_ERROR } from "../../config/";

const initState = {
  transaction: { txId: "" },
  selectItem: { message: "", address: "" }
};

export default (state = initState, action) => {
  const payload = action.payload;
  if (payload && payload.error === API_REQUEST_ERROR) {
    action.type = API_REQUEST_ERROR;
  }

  switch (action.type) {
    case API_START_TRANSACTION:
      return {
        ...state,
        transaction: { txId: payload.data.txtid }
      };

    case API_SELECT_ITEM:
      return {
        ...state,
        selectItem: {
          message: action.payload.data.message,
          address: action.payload.data.address
        }
      };

    case API_GIVE_PEER_ID:
      return state;

    default:
      return state;
  }
};
