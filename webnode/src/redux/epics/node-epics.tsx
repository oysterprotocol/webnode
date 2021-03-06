import { fromPromise } from "rxjs/observable/fromPromise";
import { of } from "rxjs/observable/of";
import { empty } from "rxjs/observable/empty";

import { combineEpics } from "redux-observable";

import nodeActions from "../actions/node-actions";
import treasureHuntActions from "../actions/treasure-hunt-actions";
import nodeSelectors from "../selectors/node-selectors";
import brokerNode from "../services/broker-node";
import iota from "../services/iota";
import util from "node-forge/lib/util";

import Datamap from "datamap-generator";

import {
  MIN_GENESIS_HASHES,
  MIN_BROKER_NODES,
  CHUNKS_PER_SECTOR
} from "../../config";

const registerWebnodeEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_INITIALIZE, nodeActions.NODE_RESET)
    .mergeMap(action => {
      const { id } = store.getState().node;
      const brokerNodeUrl = nodeSelectors.brokerNodeUrl(store.getState());

      return fromPromise(
        brokerNode.registerWebnode({ brokerNodeUrl, address: id })
      )
        .map(({ data }: any) => {
          console.log("/api/v1/supply/webnodes response:", data);
          return nodeActions.determineBrokerNodeOrGenesisHash();
        })
        .catch(error => {
          console.log("/api/v1/supply/webnodes error:", error);
          // TODO: fire a generic error action
          return of(nodeActions.determineBrokerNodeOrGenesisHash());
        });
    });
};

const brokerNodeOrGenesisHashEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_DETERMINE_BROKER_NODE_OR_GENESIS_HASH)
    .mergeMap(() => {
      const { node } = store.getState();
      return of(
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
        return of(nodeActions.requestGenesisHashes());
      } else {
        const { genesisHash, numberOfChunks } = treasureHuntableGenesisHash;
        const sectorIdx = treasureHuntableSector;
        return of(
          nodeActions.resumeOrStartNewSector({
            genesisHash,
            numberOfChunks,
            sectorIdx
          })
        );
      }
    });
};

const resumeOrStartNewSectorEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_RESUME_OR_START_NEW_SECTOR)
    .mergeMap(action => {
      const { genesisHash, numberOfChunks, sectorIdx } = action.payload;
      const {
        chunkIdx,
        sectorIdx: currentSectorIdx,
        genesisHash: currentGenesisHash
      } = store.getState().treasureHunt;
      const sectorsFirstChunkIdx = sectorIdx * CHUNKS_PER_SECTOR;

      const alreadyStartedSector =
        chunkIdx > sectorsFirstChunkIdx &&
        currentSectorIdx === sectorIdx &&
        genesisHash === currentGenesisHash;

      return alreadyStartedSector
        ? of(treasureHuntActions.performPow())
        : of(
            nodeActions.checkIfSectorClaimed({
              genesisHash,
              numberOfChunks,
              sectorIdx
            })
          );
    });
};

const requestBrokerEpic = (action$, store) => {
  return action$.ofType(nodeActions.NODE_REQUEST_BROKER_NODES).mergeMap(() => {
    const { brokerNodes } = store.getState().node;
    const currentList = brokerNodes.map(bn => bn.address);
    const brokerNodeUrl = nodeSelectors.brokerNodeUrl(store.getState());

    return fromPromise(
      brokerNode.requestBrokerNodeAddressPoW({ brokerNodeUrl, currentList })
    )
      .mergeMap(({ data }: any) => {
        const {
          id: txid,
          pow: { message, address, branchTx, trunkTx }
        } = data;

        // TODO: change this
        const value = 0;
        const tag = "EDMUNDANDREBELWUZHERE";
        const seed =
          "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

        return fromPromise(
          iota.prepareTransfers({ address, message, value, tag, seed })
        ).map(trytes => {
          return { txid, trytes, branchTx, trunkTx };
        });
      })
      .mergeMap(({ txid, trytes, branchTx, trunkTx }) =>
        fromPromise(
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
        fromPromise(
          brokerNode.completeBrokerNodeAddressPoW({
            brokerNodeUrl,
            txid,
            trytes: trytesArray[0]
          })
        ).mergeMap(({ data }: any) => {
          const { purchase: address } = data;
          return [
            nodeActions.addBrokerNode({ address }),
            nodeActions.determineBrokerNodeOrGenesisHash()
          ];
        })
      )
      .catch(error => {
        console.log("BROKER NODE ADDRESS FETCH ERROR", error);
        return empty();
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

      return fromPromise(
        brokerNode.requestGenesisHashPoW({ brokerNodeUrl, currentList })
      )
        .mergeMap(({ data }: any) => {
          const {
            id: txid,
            pow: { message, address, branchTx, trunkTx }
          } = data;

          // TODO: change this
          const value = 0;
          const tag = "EDMUNDANDREBELWUZHERE";
          const seed =
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

          return fromPromise(
            iota.prepareTransfers({ address, message, value, tag, seed })
          ).map(trytes => {
            return { txid, trytes, branchTx, trunkTx };
          });
        })
        .mergeMap(({ txid, trytes, branchTx, trunkTx }) =>
          fromPromise(
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
          fromPromise(
            brokerNode.completeGenesisHashPoW({
              brokerNodeUrl,
              txid,
              trytes: trytesArray[0]
            })
          )
            .mergeMap(({ data }: any) => {
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
              return empty();
            })
        )
        .catch(error => {
          console.log("GENESIS HASH FETCH ERROR", error);
          return empty();
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

      const hashInBytes = util.hexToBytes(dataMapHash);
      const [obfuscatedHash] = Datamap.hashChain(hashInBytes); //eslint-ignore-line
      const address = iota.toAddress(iota.utils.toTrytes(obfuscatedHash));

      return fromPromise(iota.checkIfClaimed(address)).map(
        claimed =>
          claimed
            ? nodeActions.updateSectorStatus({
                genesisHash,
                sectorIdx
              })
            : treasureHuntActions.startSector({
                dataMapHash,
                genesisHash,
                numberOfChunks,
                sectorIdx
              })
      );
    });
};

const updateSectorStatusEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_UPDATE_SECTOR_STATUS)
    .map(nodeActions.determineGenesisHashOrTreasureHunt);
};

export default combineEpics(
  registerWebnodeEpic,
  brokerNodeOrGenesisHashEpic,
  genesisHashOrTreasureHuntEpic,
  requestBrokerEpic,
  requestGenesisHashEpic,
  resumeOrStartNewSectorEpic,
  checkIfSectorClaimedEpic,
  updateSectorStatusEpic
);
