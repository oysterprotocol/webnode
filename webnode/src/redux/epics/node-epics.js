import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";

import nodeActions from "../actions/node-actions";
import treasureHuntActions from "../actions/treasure-hunt-actions";
import nodeSelectors from "../selectors/node-selectors";
import brokerNode from "../services/broker-node";
import iota from "../services/iota";

import Datamap from "datamap-generator";

import {
  MIN_GENESIS_HASHES,
  MIN_BROKER_NODES,
  CHUNKS_PER_SECTOR,
  TEST_GENESIS_HASHES
} from "../../config/";

const registerWebnodeEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_INITIALIZE, nodeActions.NODE_RESET)
    .mergeMap(action => {
      const { id } = store.getState().node;
      const brokerNodeUrl = nodeSelectors.brokerNodeUrl(store.getState());

      return Observable.fromPromise(
        brokerNode.registerWebnode({ brokerNodeUrl, address: id })
      )
        .map(({ data }) => {
          console.log("/api/v1/supply/webnodes response:", data);
          return nodeActions.determineBrokerNodeOrGenesisHash();
        })
        .catch(error => {
          console.log("/api/v1/supply/webnodes error:", error);
          // TODO: fire a generic error action
          return Observable.of(nodeActions.determineBrokerNodeOrGenesisHash());
        });
    });
};

const brokerNodeOrGenesisHashEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_DETERMINE_BROKER_NODE_OR_GENESIS_HASH)
    .mergeMap(() => {
      const { node } = store.getState();
      return Observable.of(
        node.brokerNodes.length < MIN_BROKER_NODES
          ? nodeActions.requestBrokerNodes()
          : nodeActions.determineGenesisHashOrTreasureHunt()
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
        node.newGenesisHashes.length < MIN_GENESIS_HASHES ||
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
    const brokerNodeUrl = nodeSelectors.brokerNodeUrl(store.getState());

    return Observable.fromPromise(
      brokerNode.requestBrokerNodeAddressPoW({ brokerNodeUrl, currentList })
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
            mwm: 9,
            trytes
          })
        ).map(trytesArray => {
          return { txid, trytesArray };
        })
      )
      .mergeMap(({ txid, trytesArray }) =>
        Observable.fromPromise(
          brokerNode.completeBrokerNodeAddressPoW({
            brokerNodeUrl,
            txid,
            trytes: trytesArray[0]
          })
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
      const brokerNodeUrl = nodeSelectors.brokerNodeUrl(store.getState());

      return Observable.fromPromise(
        brokerNode.requestGenesisHashPoW({ brokerNodeUrl, currentList })
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
              mwm: 9,
              trytes
            })
          ).map(trytesArray => {
            return { txid, trytesArray };
          })
        )
        .mergeMap(({ txid, trytesArray }) =>
          Observable.fromPromise(
            brokerNode.completeGenesisHashPoW({
              brokerNodeUrl,
              txid,
              trytes: trytesArray[0]
            })
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
      const dataMap = Datamap.rawGenerate(genesisHash, numberOfChunks);
      const dataMapHash = dataMap[specialChunkIdx];

      // NOT positive this is correct but it worked in the treasure hunt epic
      global.iota = iota;
      global.Datamap = Datamap;
      global.dataMapHash = dataMapHash;

      const address = iota.toAddress(
        iota.utils.toTrytes(Datamap.obfuscate(dataMapHash))
      );
      // const address =
      //   "HT9MZQXKVBVT9AYVTISCLELYWXTILJDIMHFQRGS9YIJUIRSSNRZFIZCHYHQHKZIPGYYCSUSARFNSXD9UY";

      return Observable.fromPromise(
        iota.findMostRecentTransaction(address)
      ).map(transaction => {
        if (
          iota.checkIfClaimed(transaction) &&
          !TEST_GENESIS_HASHES.includes(genesisHash)
        ) {
          return nodeActions.markSectorAsClaimed({
            genesisHash,
            sectorIdx
          });
        } else {
          return treasureHuntActions.startSector({
            dataMapHash,
            genesisHash,
            numberOfChunks,
            sectorIdx
          });
        }
      });
    });
};

const markSectorAsClaimedEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_MARK_SECTOR_AS_CLAIMED)
    .map(nodeActions.determineGenesisHashOrTreasureHunt);
};

export default combineEpics(
  registerWebnodeEpic,
  brokerNodeOrGenesisHashEpic,
  genesisHashOrTreasureHuntEpic,
  requestBrokerEpic,
  requestGenesisHashEpic,
  checkIfSectorClaimedEpic,
  markSectorAsClaimedEpic
);
