import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import moment from "moment";

import nodeActions from "../actions/node-actions";
import brokerNode from "../services/broker-node";
import iota from "../services/iota";

// TODO remove this when we get the Go API done
import powActions from "../actions/pow-actions";

import { MIN_GENESIS_HASHES, MIN_BROKER_NODES } from "../../config/";

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

const collectBrokersEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_DETERMINE_REQUEST)
    .filter(() => {
      const { node } = store.getState();
      return node.genesisHashes.length <= MIN_BROKER_NODES;
    })
    .map(nodeActions.requestBrokerNodes);
};

const collectGenesisHashesEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_DETERMINE_REQUEST)
    .filter(() => {
      const { node } = store.getState();
      return node.brokerNodes.length <= MIN_GENESIS_HASHES;
    })
    .map(nodeActions.requestGenesisHashes);
};

const requestBrokerEpic = (action$, store) => {
  return action$.ofType(nodeActions.NODE_REQUEST_BROKER_NODES).mergeMap(() => {
    const { brokerNodes } = store.getState().node;
    return Observable.fromPromise(
      brokerNode.requestBrokerNodeAddressPoW(brokerNodes)
    )
      .mergeMap(({ data }) => {
        const { id: txid, pow: { message, address, branchTx, trunkTx } } = data;

        // TODO: change this
        const value = 0;
        const tag = "EDMUNDANDREBELWUZHERE";
        const seed =
          "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

        return Observable.fromPromise(
          iota.prepareTransfers({ address, message, value, tag, seed })
        ).map(trytes => {
          return { txid, trytes, branchTx, trunkTx };
        });
      })
      .mergeMap(({ txid, trytes, branchTx, trunkTx }) =>
        Observable.fromPromise(
          iota.attachToTangleCurl({
            branchTx,
            trunkTx,
            mwm: 14,
            trytes
          })
        ).map(trytesArray => {
          return { txid, trytesArray };
        })
      )
      .mergeMap(({ txid, trytesArray }) =>
        Observable.fromPromise(
          brokerNode.completeBrokerNodeAddressPoW(txid, trytesArray[0])
        ).map(({ data }) => {
          const { purchase: brokerNodeAddress } = data;
          return nodeActions.addBrokerNode(brokerNodeAddress);
        })
      )
      .catch(error => {
        console.log("BROKER NODE ADDRESS FETCH ERROR", error);
        return Observable.empty();
      });
  });
};

const requestGenesisHashEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_REQUEST_GENESIS_HASHES)
    .mergeMap(() => {
      const { genesisHashes } = store.getState().node;
      return Observable.fromPromise(
        brokerNode.requestGenesisHashPoW(genesisHashes)
      )
        .mergeMap(({ data }) => {
          const {
            id: txid,
            pow: { message, address, branchTx, trunkTx }
          } = data;

          // TODO: change this
          const value = 0;
          const tag = "EDMUNDANDREBELWUZHERE";
          const seed =
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

          return Observable.fromPromise(
            iota.prepareTransfers({ address, message, value, tag, seed })
          ).map(trytes => {
            return { txid, trytes, branchTx, trunkTx };
          });
        })
        .mergeMap(({ txid, trytes, branchTx, trunkTx }) =>
          Observable.fromPromise(
            iota.attachToTangleCurl({
              branchTx,
              trunkTx,
              mwm: 14,
              trytes
            })
          ).map(trytesArray => {
            return { txid, trytesArray };
          })
        )
        .mergeMap(({ txid, trytesArray }) =>
          Observable.fromPromise(
            brokerNode.completeGenesisHashPoW(txid, trytesArray[0])
          ).map(({ data }) => {
            const { purchase: genesisHash, numberOfChunks } = data;
            return nodeActions.addGenesisHash(genesisHash);
          })
        )
        .catch(error => {
          console.log("GENESIS HASH FETCH ERROR", error);
          return Observable.empty();
        });
    });
};

export default combineEpics(
  registerWebnodeEpic,
  // findMoreWorkEpic,
  // collectBrokersEpic,
  collectGenesisHashesEpic,
  requestBrokerEpic,
  requestGenesisHashEpic
);
