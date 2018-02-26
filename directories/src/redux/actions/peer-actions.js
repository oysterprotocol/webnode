const PEER_INIT = 'directories/peer/init';
const PEER_CONNECT_TO = 'directories/peer/connect/to';
const PEER_SEND_MESSAGE = 'directories/peer/send/message';
const PEER_OPEN = 'directories/peer/open';
const PEER_CONNECTION = 'directories/peer/connection';
const PEER_CONNECTING = 'directories/peer/connecting';

const ACTIONS = Object.freeze({
  // actions
  PEER_INIT,
  PEER_CONNECT_TO,
  PEER_SEND_MESSAGE,
  PEER_OPEN,
  PEER_CONNECTION,
  PEER_CONNECTING,

  // actionCreators
  peerInitAction: () => ({
    type: ACTIONS.PEER_INIT
  }),

  peerConnectToAction: (remotePeerId) => ({
    type: ACTIONS.PEER_CONNECT_TO,
    remotePeerId: remotePeerId
  }),

  peerSendMessageAction: (message) => ({
    type: ACTIONS.PEER_SEND_MESSAGE,
    message: message
  }),

  peerOpenAction: () => ({
    type: ACTIONS.PEER_OPEN
  }),

  peerConnectionAction: () => ({
    type: ACTIONS.PEER_CONNECTION
  }),

  peerConnectingAction: () => ({
    type: ACTIONS.PEER_CONNECTING
  })

});

export default ACTIONS;
