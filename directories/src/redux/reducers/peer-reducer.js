import peerActions from 'redux/actions/peer-actions';

const initState = {
  peer: {id: '', connections: []}
};

const peerReducer = (state = initState, action) => {
  switch (action.type) {
    case peerActions.PEER_INIT:
      return action.peer;
    case peerActions.PEER_OPEN:
    case peerActions.PEER_CONNECTION:
    case peerActions.PEER_CONNECTING:
      return {...action.peer};
    default:
      return state;
  }
};

export default peerReducer;
