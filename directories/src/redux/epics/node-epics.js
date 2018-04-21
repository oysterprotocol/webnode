import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import moment from "moment";
import _ from "lodash";

import nodeActions from "../actions/node-actions";
import brokerNode from "../services/broker-node";
import iota from "../services/iota";

import Datamap from "../../utils/datamap";
import AppUtils from "../../utils/app";

// TODO remove this when we get the Go API done
import powActions from "../actions/pow-actions";

import {
  MIN_GENESIS_HASHES,
  MIN_BROKER_NODES,
  SECTOR_DIVIDER
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
        nodeActions.requestBrokerNodes,
        nodeActions.determineGenesisHashOrTreasureHunt
      );
    });
};

const genesisHashOrTreasureHuntEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_DETERMINE_GENESIS_HASH_OR_TREASURE_HUNT)
    .mergeMap(() => {
      const { node } = store.getState();
      return Observable.if(
        () => node.newGenesisHashes.length <= MIN_GENESIS_HASHES,
        Observable.of(nodeActions.requestGenesisHashes()),
        Observable.of(nodeActions.treasureHunt())
      );
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
        ).flatMap(({ data }) => {
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
          )
            .flatMap(({ data }) => {
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

const treasureHuntEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_TREASURE_HUNT)
    .mergeMap((action) => {
      //const { genesisHash, numberOfChunks } = action.store.newGenesisHashes[0];
      const genesisHash = 'aaaaaaa';
      const numberOfChunks = 'bbbbbb';
      const datamap = Datamap.generate(genesisHash, numberOfChunks);
      const addresses = _.values(datamap);
      const countSector = addresses / SECTOR_DIVIDER;
      const randomSector = AppUtils.randomArray(1, countSector);
      return Observable.from(randomSector)
        .map((sectorIndex) => {
          let min = 0;
          if((sectorIndex - 1) !== 0) {
            min = (sectorIndex - 1) * SECTOR_DIVIDER;
          }
          const max = (sectorIndex * SECTOR_DIVIDER) - 1;
          const randomSectorAddress = AppUtils.randomArray(min, max);
          return Observable.from(randomSectorAddress)
            .map((addressIndex) => {
              const randomAddress = addresses.slice(addressIndex);
              return Observable.fromPromise(
                iota.findTransactions(randomAddress)
              )
                .mergeMap(({ hashes }) => {
                  return Observable.fromPromise(
                    iota.getTrytes(hashes)
                  )
                  .map(({ trytesArray }) => {
                    const transactionObject = iota.utils.TransactionObject(trytesArray);
                    const asciiTimestampTrytes = trytesArray.map(tryte => tryte.timestamp.charCodeAt(0))
                      .reduce((current, previous) => previous + current);
                    return nodeActions.completeTreasureHunt();
                  });
                })
                .catch(error => {
                  console.log("TREASURE HUNT ERROR", error);
                  return Observable.empty();
                });
            })
        })
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
  requestGenesisHashEpic
);
