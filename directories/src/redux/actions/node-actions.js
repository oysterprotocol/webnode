export const NODE_DETERMINE_REQUEST = "directories/node/determine_request";
export const NODE_REQUEST_BROKER_NODES =
  "directories/node/request_broker_nodes";

export const NODE_ADD_BROKER_NODE = "directories/node/add_broker_node";
export const NODE_RESET = "directories/node/reset";

const ACTIONS = Object.freeze({
  // actions
  NODE_DETERMINE_REQUEST,
  NODE_ADD_BROKER_NODE,
  NODE_RESET,

  // actionCreators
  determineRequest: () => ({
    type: NODE_DETERMINE_REQUEST
  }),

  requestBrokerNodes: () => ({
    type: NODE_REQUEST_BROKER_NODES
  }),

  addBrokerNode: brokerNode => ({
    type: NODE_ADD_BROKER_NODE,
    payload: brokerNode
  }),

  resetNode: ({ id, lastResetAt }) => ({
    type: NODE_RESET,
    payload: { id, lastResetAt }
  })
});

export default ACTIONS;
