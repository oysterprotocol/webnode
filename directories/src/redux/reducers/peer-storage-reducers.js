import {
  PEER_RECIEVE_SUCCESS,
  PEER_SEND_SUCCESS
} from '../actions/action-types';

const initState = {
  peerStorage: {}
}

export default (state = initState, action) => {
  switch (action.type) {
    case PEER_RECIEVE_SUCCESS: {
      const senderId = action.payload.sender.id
      const updatedData = state[senderId] ?
      [
        ...state[senderId],
        action.payload,
      ] :
      [
        action.payload,
      ]
      return {
        ...state,
        [senderId]: updatedData
      }
    }
    case PEER_SEND_SUCCESS: {
      const receiverId = action.payload.receiver.id
      const updatedData = state[receiverId] ?
      [
        ...state[receiverId],
        action.payload,
      ] :
      [
        action.payload,
      ]

      return {
        ...state,
        [receiverId]: updatedData
      }
    }
    default: {
      return state
    }
  }
}
