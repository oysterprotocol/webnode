import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import moment from "moment";

import { NODE_RESET, NODE_REQUEST_BROKER_NODES } from "../actions/node-reducer";
import brokerNode from "../services/broker-node";

const requestBrokerEpic = (action$, store) => {
  return action$
    .ofType(NODE_RESET, NODE_REQUEST_BROKER_NODES)
    .filter(() => {
      const { node } = store.getState();
      return node.brokerNodes.length <= 5;
    })
    .mergeMap(() => {
      return Observable.fromPromise(
        brokerNode.requestBrokerNodeAddresses()
      ).then(({ data }) => {
        console.log("/api/v1/broker_nodes response:", data);
      });
    });
};

export default combineEpics(startAppEpic);
