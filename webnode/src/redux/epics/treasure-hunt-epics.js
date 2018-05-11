import { Observable } from "rxjs";
import { combineEpics, store } from "redux-observable"; //TODO remove store as dependency

import _ from "lodash";

import nodeActions from "../actions/node-actions";
import treasureHuntActions from "../actions/treasure-hunt-actions";
import iota from "../services/iota";
import BrokerNode from "../services/broker-node";

import Datamap from "../../utils/datamap";
import Sidechain from "../../utils/sidechain";
import Encryption from "../../utils/encryption";

import { CHUNKS_PER_SECTOR } from "../../config/";

const performPowEpic = (action$, store) => {
  return action$
    .ofType(treasureHuntActions.TREASURE_HUNT_PERFORM_POW)
    .mergeMap(action => {
      const { treasureHunt } = store.getState();
      const { dataMapHash, treasure, chunkIdx, numberOfChunks } = treasureHunt;

      // const address = Encryption.obfuscate(dataMapHash);
      const address =
        "HT9MZQXKVBVT9AYVTISCLELYWXTILJDIMHFQRGS9YIJUIRSSNRZFIZCHYHQHKZIPGYYCSUSARFNSXD9UY";

      const [_obfHash, nextDataMapHash] = Encryption.hashChain(dataMapHash);

      // TODO: change this
      const value = 0;
      const tag = "EDMUNDANDREBELWUZHERE";
      const seed =
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

      return Observable.fromPromise(iota.findMostRecentTransaction(address))
        .map(transaction => transaction.signatureMessageFragment)
        .mergeMap(message =>
          Observable.fromPromise(
            iota.getTransactionsToApprove(1)
          ).map(
            ({ trunkTransaction: trunkTx, branchTransaction: branchTx }) => {
              return { message, trunkTx, branchTx };
            }
          )
        )
        .mergeMap(({ trunkTx, branchTx, message }) =>
          Observable.fromPromise(
            iota.prepareTransfers({ address, message, value, tag, seed })
          ).map(trytes => {
            return { trytes, trunkTx, branchTx };
          })
        )
        .mergeMap(({ trytes, trunkTx, branchTx }) =>
          Observable.fromPromise(
            iota.localPow({
              trunkTx,
              branchTx,
              mwm: 14,
              trytes
            })
          )
        )
        .mergeMap(trytesArray =>
          Observable.fromPromise(iota.broadcastTransactions(trytesArray))
        )
        .mergeMap(() =>
          Observable.if(
            () => !treasure,
            Observable.of(
              treasureHuntActions.findTreasure({
                dataMapHash,
                chunkIdx
              })
            ),
            Observable.of(
              treasureHuntActions.incrementChunk({
                nextChunkIdx: chunkIdx + 1,
                nextDataMapHash
              })
            )
          )
        )
        .catch(error => {
          console.log("TREASURE HUNTING ERROR", error);
          return Observable.empty();
        });
    });
};

const findTreasureEpic = (action$, store) => {
  return action$
    .ofType(treasureHuntActions.TREASURE_HUNT_FIND_TREASURE)
    .mergeMap(action => {
      const { dataMapHash, chunkIdx } = action.payload;

      const address = dataMapHash;
      //    const address =
      //      "HT9MZQXKVBVT9AYVTISCLELYWXTILJDIMHFQRGS9YIJUIRSSNRZFIZCHYHQHKZIPGYYCSUSARFNSXD9UY";

      return Observable.fromPromise(
        iota.findMostRecentTransaction(address)
      ).mergeMap(transaction => {
        const message = iota.parseMessage(transaction.signatureMessageFragment);
        const sideChain = Sidechain.generate(address);
        store.dispatch({
          //TODO Remove this dispatch
          type: "IOTA_RETURN"
        });

        const chainWithTreasure = _.find(
          sideChain,
          hashedAddress => !!Encryption.decrypt(message, hashedAddress)
        );

        const [_obfHash, nextDataMapHash] = Encryption.hashChain(dataMapHash);

        return Observable.if(
          () => !!chainWithTreasure,
          Observable.of(
            treasureHuntActions.saveTreasure({
              treasure: Encryption.decrypt(message, chainWithTreasure), //TODO: Fix decryption
              nextChunkIdx: chunkIdx + 1,
              nextDataMapHash
            })
          ),
          Observable.of(
            treasureHuntActions.incrementChunk({
              nextChunkIdx: chunkIdx + 1,
              nextDataMapHash
            })
          )
        );
      });
    });
};

const nextChunkEpic = (action$, store) => {
  return action$
    .ofType(
      treasureHuntActions.TREASURE_HUNT_START_SECTOR,
      treasureHuntActions.TREASURE_HUNT_SAVE_TREASURE,
      treasureHuntActions.TREASURE_HUNT_INCREMENT_CHUNK
    )
    .mergeMap(() => {
      const { treasureHunt } = store.getState();
      const {
        treasure,
        genesisHash,
        chunkIdx,
        numberOfChunks,
        sectorIdx
      } = treasureHunt;

      // TODO: replace with real address
      const receiverEthAddr = "0xakj1123i";

      const endOfFile = chunkIdx > numberOfChunks;
      const endOfSector = chunkIdx > CHUNKS_PER_SECTOR * (sectorIdx + 1) - 1;

      return Observable.if(
        () => endOfFile || endOfSector,
        Observable.of(
          treasureHuntActions.claimTreasure({
            treasure,
            genesisHash,
            numberOfChunks,
            receiverEthAddr,
            sectorIdx
          })
        ),
        Observable.of(treasureHuntActions.performPow())
      );
    });
};

const claimTreasureEpic = (action$, store) => {
  return action$
    .ofType(treasureHuntActions.TREASURE_HUNT_CLAIM_TREASURE)
    .mergeMap(action => {
      const {
        receiverEthAddr,
        genesisHash,
        numChunks,
        sectorIdx,
        treasure
      } = action.payload;
      const { ethKey, ethAddr } = treasure;

      return Observable.fromPromise(
        BrokerNode.claimTreasure({
          receiverEthAddr,
          genesisHash,
          numChunks,
          sectorIdx,
          ethKey,
          ethAddr
        })
      )
        .map(() =>
          treasureHuntActions.treasureClaimComplete({ genesisHash, sectorIdx })
        )
        .catch(error => {
          console.log("CLAIM TREASURE ERROR: ", error);
          return Observable.empty();
        });
    });
};

const completeSectorEpic = (action$, store) => {
  return action$
    .ofType(treasureHuntActions.TREASURE_HUNT_CLAIM_TREASURE_SUCCESS)
    .map(action => {
      const { genesisHash, sectorIdx } = action.payload;
      return nodeActions.markSectorAsClaimed({ genesisHash, sectorIdx });
    });
};

export default combineEpics(
  performPowEpic,
  findTreasureEpic,
  nextChunkEpic,
  claimTreasureEpic
);
