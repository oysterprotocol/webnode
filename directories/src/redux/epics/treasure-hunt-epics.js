import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import _ from "lodash";

import treasureHuntActions from "../actions/treasure-hunt-actions";
import iota from "../services/iota";

import Datamap from "../../utils/datamap";
import Sidechain from "../../utils/sidechain";
import Encryption from "../../utils/encryption";

const performPowEpic = (action$, store) => {
  return action$
    .ofType(treasureHuntActions.TREASURE_HUNT_PERFORM_POW)
    .mergeMap(action => {
      const { treasureHunt } = store.getState();
      const { address, treasure, chunkIdx, numberOfChunks } = treasureHunt;

      // TODO: change this
      const value = 0;
      const tag = "EDMUNDANDREBELWUZHERE";
      const seed =
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

      return Observable.fromPromise(iota.findMostRecentTransaction(address))
        .map(transaction => {
          return transaction.signatureMessageFragment;
        })
        .mergeMap(message =>
          Observable.fromPromise(iota.getTransactionsToApprove(1)).map(
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
                address,
                chunkIdx
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
      const { address, chunkIdx } = action.payload;

      return Observable.fromPromise(
        iota.findMostRecentTransaction(address)
      ).mergeMap(transaction => {
        const message = iota.parseMessage(transaction.signatureMessageFragment);
        const sideChain = Sidechain.generate(address);
        const treasure = _.find(
          sideChain,
          hashedAddress => !!Encryption.decrypt(message, hashedAddress)
        );

        const [_obfHash, nextAddress] = Encryption.hashChain(address);

        return Observable.if(
          () => !!treasure,
          Observable.of(
            treasureHuntActions.saveTreasure({
              treasure,
              nextChunkIdx: chunkIdx + 1,
              nextAddress
            })
          )
        );
      });
    });
};

export default combineEpics(performPowEpic, findTreasureEpic);
