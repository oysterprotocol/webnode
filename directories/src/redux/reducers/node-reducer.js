import _ from "lodash";

export const NODE_REQUEST_BROKER_NODES =
  "directories/node/request_broker_nodes";
export const NODE_ADD_BROKER_NODE = "directories/node/add_broker_node";
export const NODE_ADD_WEB_NODE = "directories/node/add_web_node";
export const NODE_RESET = "directories/node/reset";

const initState = {
  brokerNodes: [],
  webNodes: [],
  id: null,
  lastResetAt: new Date()
};

export default (state = initState, action) => {
  switch (action.type) {
    case NODE_ADD_WEB_NODE:
      return {
        ...state,
        webNodes: _.uniq([...state.webNodes, ...action.payload])
      };

    case NODE_ADD_BROKER_NODE:
      return {
        ...state,
        brokerNodes: _.uniq([...state.brokerNodes, ...action.payload])
      };

    case NODE_RESET:
      const { id, lastResetAt } = action.payload;
      return { ...state, id, lastResetAt, brokerNodes: [], webNodes: [] };

    default:
      return { ...state };
  }
};
