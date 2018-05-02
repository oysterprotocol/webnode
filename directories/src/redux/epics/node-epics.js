import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import moment from "moment";
import _ from "lodash";

import nodeActions from "../actions/node-actions";
import treasureHuntActions from "../actions/treasure-hunt-actions";
import nodeSelectors from "../selectors/node-selectors";
import brokerNode from "../services/broker-node";
import iota from "../services/iota";

import Datamap from "../../utils/datamap";
import AppUtils from "../../utils/app";

// TODO remove this when we get the Go API done
import powActions from "../actions/pow-actions";

import {
  MIN_GENESIS_HASHES,
  MIN_BROKER_NODES,
  SECTOR_STATUS,
  CHUNKS_PER_SECTOR
} from "../../config/";

const registerWebnodeEpic = (action$, store) => {
  return action$.ofType(nodeActions.NODE_RESET).mergeMap(action => {
    const { id } = action.payload;
    return Observable.fromPromise(brokerNode.registerWebnode(id))
      .map(({ data }) => {
        console.log("/api/v1/supply/webnodes response:", data);
        return nodeActions.determineGenesisHashOrTreasureHunt();
      })
      .catch(error => {
        console.log("/api/v1/supply/webnodes error:", error);
        return nodeActions.determineGenesisHashOrTreasureHunt();
      });
  });
};

const brokerNodeOrGenesisHashEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_DETERMINE_BROKER_NODE_OR_GENESIS_HASH)
    .mergeMap(() => {
      const { node } = store.getState();
      return Observable.if(
        () => node.brokerNodes.length <= MIN_BROKER_NODES,
        Observable.of(nodeActions.requestBrokerNodes()),
        Observable.of(nodeActions.determineGenesisHashOrTreasureHunt())
      );
    });
};

const genesisHashOrTreasureHuntEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_DETERMINE_GENESIS_HASH_OR_TREASURE_HUNT)
    .mergeMap(() => {
      const { node } = store.getState();
      const treasureHuntableGenesisHash = nodeSelectors.treasureHuntableGenesisHash(
        store.getState()
      );
      const treasureHuntableSector = nodeSelectors.treasureHuntableSector(
        store.getState()
      );

      if (
        node.newGenesisHashes.length <= MIN_GENESIS_HASHES &&
        !treasureHuntableGenesisHash
      ) {
        return Observable.of(nodeActions.requestGenesisHashes());
      } else {
        const { genesisHash, numberOfChunks } = treasureHuntableGenesisHash;
        const { index } = treasureHuntableSector;
        return Observable.of(
          nodeActions.checkIfSectorClaimed({
            genesisHash: genesisHash,
            numberOfChunks: numberOfChunks,
            sectorIdx: index
          })
        );
      }
    });
};

const requestBrokerEpic = (action$, store) => {
  return action$.ofType(nodeActions.NODE_REQUEST_BROKER_NODES).mergeMap(() => {
    const { brokerNodes } = store.getState().node;
    const currentList = brokerNodes.map(bn => bn.address);
    return Observable.fromPromise(
      brokerNode.requestBrokerNodeAddressPoW(currentList)
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
          iota.localPow({
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
        ).mergeMap(({ data }) => {
          const { purchase: address } = data;
          return [
            nodeActions.addBrokerNode({ address }),
            nodeActions.determineBrokerNodeOrGenesisHash()
          ];
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
      const { newGenesisHashes } = store.getState().node;
      const currentList = newGenesisHashes.map(gh => gh.genesisHash);
      return Observable.fromPromise(
        brokerNode.requestGenesisHashPoW(currentList)
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
            iota.localPow({
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
          )
            .mergeMap(({ data }) => {
              const { purchase: genesisHash, numberOfChunks } = data;
              return [
                nodeActions.addNewGenesisHash({
                  genesisHash,
                  numberOfChunks
                }),
                nodeActions.determineGenesisHashOrTreasureHunt()
              ];
            })
            .catch(error => {
              console.log("GENESIS HASH COMPLETE ERROR", error);
              return Observable.empty();
            })
        )
        .catch(error => {
          console.log("GENESIS HASH FETCH ERROR", error);
          return Observable.empty();
        });
    });
};

const checkIfSectorClaimedEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_CHECK_IF_SECTOR_CLAIMED)
    .mergeMap(action => {
      const { genesisHash, numberOfChunks, sectorIdx } = action.payload;
      const specialChunkIdx = sectorIdx * CHUNKS_PER_SECTOR;
      const dataMap = Datamap.generate(genesisHash, numberOfChunks);
      // const address = dataMap[specialChunkIdx];
      const address =
        "HT9MZQXKVBVT9AYVTISCLELYWXTILJDIMHFQRGS9YIJUIRSSNRZFIZCHYHQHKZIPGYYCSUSARFNSXD9UY";

      return Observable.fromPromise(
        iota.findMostRecentTransaction(address)
      ).map(transaction => {
        if (iota.checkIfClaimed(transaction)) {
          return nodeActions.markSectorAsClaimedByOtherNode({
            genesisHash,
            sectorIdx
          });
        } else {
          return treasureHuntActions.performPow({
            address,
            genesisHash,
            numberOfChunks,
            sectorIdx
          });
        }
      });
    });
};

export default combineEpics(
  registerWebnodeEpic,
  // brokerNodeOrGenesisHashEpic,
  genesisHashOrTreasureHuntEpic,
  // findMoreWorkEpic,
  // collectBrokersEpic,
  // collectGenesisHashesEpic,
  // requestBrokerEpic,
  requestGenesisHashEpic,
  checkIfSectorClaimedEpic
);
