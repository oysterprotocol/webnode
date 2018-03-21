import _ from "lodash";

export const NODE_ADD_BROKER_NODES = "directories/node/add_broker_nodes";
export const NODE_ADD_WEB_NODES = "directories/node/add_web_nodes";
export const NODE_RESET = "directories/node/reset";

const initState = {
  brokerNodes: [],
  webNodes: [],
  id: null,
  lastResetAt: new Date()
};

export default (state = initState, action) => {
  switch (action.type) {
    case NODE_ADD_WEB_NODES:
      return {
        ...state,
        webNodes: _.uniq([...state.webNodes, ...action.payload])
      };

    case NODE_ADD_BROKER_NODES:
      return {
        ...state,
        brokerNodes: _.uniq([...state.brokerNodes, ...action.payload])
      };

    case NODE_RESET:
      const { id, lastResetAt } = action.payload;
      return { ...state, id, lastResetAt };

    default:
      return { ...state };
  }
};
