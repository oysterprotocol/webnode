export const NODE_REQUEST_BROKER_NODES =
  "directories/node/request_broker_nodes";
export const NODE_ADD_BROKER_NODE = "directories/node/add_broker_node";
export const NODE_ADD_WEB_NODE = "directories/node/add_web_node";
export const NODE_RESET = "directories/node/reset";

const ACTIONS = Object.freeze({
  // actions
  NODE_ADD_BROKER_NODE,
  NODE_ADD_WEB_NODE,
  NODE_RESET,

  // actionCreators
  addBrokerNode: brokerNode => ({
    type: NODE_ADD_BROKER_NODE,
    payload: brokerNode
  }),

  addWebNode: webNode => ({
    type: NODE_ADD_WEB_NODE,
    payload: webNode
  }),

  resetNode: ({ id, lastResetAt }) => ({
    type: NODE_RESET,
    payload: { id, lastResetAt }
  })
});

export default ACTIONS;
