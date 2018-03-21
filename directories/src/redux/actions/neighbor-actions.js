import {
  NEIGHBOR_ADD_BROKER_NODES,
  NEIGHBOR_ADD_WEB_NODES
} from "./action-types";

export const addBrokerNodes = brokerNodes => ({
  type: NEIGHBOR_ADD_BROKER_NODES,
  payload: brokerNodes
});

export const addWebNodes = webNodes => ({
  type: NEIGHBOR_ADD_WEB_NODES,
  payload: webNodes
});
