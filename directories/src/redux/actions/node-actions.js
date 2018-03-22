import {
  NODE_ADD_BROKER_NODE,
  NODE_ADD_WEB_NODE,
  NODE_RESET
} from "../reducers/node-reducer";

export const addBrokerNode = brokerNode => ({
  type: NODE_ADD_BROKER_NODE,
  payload: brokerNode
});

export const addWebNode = webNode => ({
  type: NODE_ADD_WEB_NODE,
  payload: webNode
});

export const resetNode = ({ id, lastResetAt }) => ({
  type: NODE_RESET,
  payload: { id, lastResetAt }
});
