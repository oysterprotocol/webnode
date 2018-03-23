import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import moment from "moment";

import nodeActions from "../actions/node-actions";
import brokerNode from "../services/broker-node";

import { MIN_BROKER_NODES } from "../../config/";

const findMoreWorkEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_RESET, nodeActions.NODE_ADD_BROKER_NODE)
    .map(nodeActions.determineRequest);
};

const determineRequestEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_DETERMINE_REQUEST)
    .filter(() => {
      const { node } = store.getState();
      return node.brokerNodes.length <= MIN_BROKER_NODES;
    })
    .map(nodeActions.requestBrokerNodes);
};

const requestBrokerEpic = (action$, store) => {
  return action$.ofType(nodeActions.NODE_REQUEST_BROKER_NODES).mergeMap(() => {
    return Observable.fromPromise(brokerNode.requestBrokerNodeAddresses())
      .map(({ data }) => {
        console.log("/api/v1/broker_nodes response:", data);
        return nodeActions.addBrokerNode("123.123.123");
      })
      .catch(error => {
        console.log("/api/v1/broker_nodes error:", error);
        return Observable.of(nodeActions.addBrokerNode("123.123.123"));
      });
  });
};

export default combineEpics(
  findMoreWorkEpic,
  determineRequestEpic,
  requestBrokerEpic
);
