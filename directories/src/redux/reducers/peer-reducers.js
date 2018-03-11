import {
  PEER_RECEIVE_SUCCESS,
  PEER_SEND_SUCCESS
} from "../actions/action-types";

const initState = {
  transactionSend: [],
  transactionReceive: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case PEER_RECEIVE_SUCCESS: {
      const senderId = action.payload.sender.id;
      const data = state[senderId]
        ? [...state[senderId], action.payload.data]
        : [action.payload.data];

      return {
        ...state,
        transactionReceive: [...state.transactionReceive, data]
      };
    }

    case PEER_SEND_SUCCESS: {
      const receiverId = action.payload.receiver.id;
      const data = state[receiverId]
        ? [...state[receiverId], action.payload.data]
        : [action.payload.data];

      return {
        ...state,
        transactionSend: [...state.transactionSend, data]
      };
    }

    default: {
      return state;
    }
  }
};
