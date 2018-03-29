import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import moment from "moment";

import nodeActions from "../actions/node-actions";
import brokerNode from "../services/broker-node";

import { MIN_BROKER_NODES } from "../../config/";

const registerWebnodeEpic = (action$, store) => {
  return action$.ofType(nodeActions.NODE_RESET).mergeMap(action => {
    const { id } = action.payload;
    return Observable.fromPromise(brokerNode.registerWebnode(id))
      .map(({ data }) => {
        console.log("/api/v1/supply/webnodes response:", data);
        return nodeActions.determineRequest();
      })
      .catch(error => {
        console.log("/api/v1/supply/webnodes error:", error);
        return Observable.of(nodeActions.determineRequest());
      });
  });
};

const findMoreWorkEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_ADD_BROKER_NODE)
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
    console.log("mmmmmmmmmmmmmmmmm");
    const { brokerNodes } = store.getState().node;
    console.log("ffffffffffffff");
    return Observable.fromPromise(
      brokerNode.requestBrokerNodeAddresses(brokerNodes)
    )
      .map(({ data }) => {
        console.log("/api/v1/demand/transactions/brokernodes response:", data);
        return nodeActions.addBrokerNode("123.123.123");
      })
      .catch(error => {
        console.log("/api/v1/demand/transactions/brokernodes response:", error);
        return Observable.of(nodeActions.addBrokerNode("123.123.123"));
      });
  });
};

export default combineEpics(
  registerWebnodeEpic,
  findMoreWorkEpic,
  determineRequestEpic,
  requestBrokerEpic
);
