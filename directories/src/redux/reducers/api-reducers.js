import {
  API_GIVE_PEER_ID,
  API_START_TRANSACTION,
  API_SELECT_ITEM,
  API_BROADCAST_TO_HOOKS
} from "../actions/action-types";

const initState = {
  transaction: { txId: "" },
  selectItem: { message: "", address: "" },
  broadcastToHooks: {}
};

export default (state = initState, action) => {
  let payload = null;
  if(action.payload) {
    payload = action.payload;
  }
  if(payload !== null) {
    switch (action.type) {
      case API_START_TRANSACTION:
        return {
          ...state,
          transaction: { txId: payload.txtid }
        };

      case API_SELECT_ITEM:
        return {
          ...state,
          selectItem: {
            message: action.payload.message,
            address: action.payload.address
          }
        };

      case API_BROADCAST_TO_HOOKS:
        return {
          ...state,
          broadcastToHooks: [...state.broadcastToHooks, action.payload]
        };

      case API_GIVE_PEER_ID:
        return state;

      default:
        return state;
    }
  }
  return state;
};

