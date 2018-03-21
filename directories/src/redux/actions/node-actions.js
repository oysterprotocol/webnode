import {
  NODE_ADD_BROKER_NODES,
  NODE_ADD_WEB_NODES,
  NODE_RESET
} from "../reducers/node-reducer";

export const addBrokerNodes = brokerNodes => ({
  type: NODE_ADD_BROKER_NODES,
  payload: brokerNodes
});

export const addWebNodes = webNodes => ({
  type: NODE_ADD_WEB_NODES,
  payload: webNodes
});

export const resetNode = ({ id, lastResetAt }) => ({
  type: NODE_RESET,
  payload: { id, lastResetAt }
});
