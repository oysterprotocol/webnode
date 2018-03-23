import _ from "lodash";

import { NODE_ADD_BROKER_NODE, NODE_RESET } from "../actions/node-actions";

const initState = {
  brokerNodes: [],
  id: null,
  lastResetAt: new Date()
};

export default (state = initState, action) => {
  switch (action.type) {
    case NODE_ADD_BROKER_NODE:
      return {
        ...state,
        brokerNodes: _.uniq([...state.brokerNodes, action.payload])
      };

    case NODE_RESET:
      const { id, lastResetAt } = action.payload;
      return { ...state, id, lastResetAt, brokerNodes: [], webNodes: [] };

    default:
      return { ...state };
  }
};
