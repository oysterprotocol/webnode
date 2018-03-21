import _ from "lodash";

export const NEIGHBOR_ADD_BROKER_NODES =
  "directories/neighbor/add_broker_nodes";
export const NEIGHBOR_ADD_WEB_NODES = "directories/neighbor/add_web_nodes";

const initState = {
  brokerNodes: [],
  webNodes: [],
  updatedAt: new Date()
};

export default (state = initState, action) => {
  switch (action.type) {
    case NEIGHBOR_ADD_WEB_NODES:
      return {
        ...state,
        webNodes: _.uniq([...state.webNodes, ...action.payload])
      };

    case NEIGHBOR_ADD_BROKER_NODES:
      return {
        ...state,
        brokerNodes: _.uniq([...state.brokerNodes, ...action.payload])
      };

    default:
      return state;
  }
};
