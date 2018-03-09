import {
  PEER_RECIEVE_SUCCESS,
  PEER_SEND_SUCCESS
} from '../actions/action-types';

const initState = {
  transactionSend: [],
  transactionReceive: []
}

export default (state = initState, action) => {

  switch (action.type) {

    case PEER_RECIEVE_SUCCESS: {

      const senderId = action.payload.sender.id;
      const data = state[senderId] ?
      [
        ...state[senderId],
        action.payload,
      ] :
      [
        action.payload
      ];

      return {
        ...state,
        transactionReceive: [...state.transactionReceive, data]
      }
    }

    case PEER_SEND_SUCCESS: {

      const receiverId = action.payload.receiver.id;
      const data = state[receiverId] ?
      [
        ...state[receiverId],
        action.payload,
      ] :
      [
        action.payload
      ];

      return {
        ...state,
        transactionSend: [...state.transactionSend, data]
      }
    }

    default: {
      return state
    }
  }
}
