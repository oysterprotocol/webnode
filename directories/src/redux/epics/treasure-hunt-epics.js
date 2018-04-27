import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import _ from "lodash";

import treasureHuntActions from "../actions/treasure-hunt-actions";
import iota from "../services/iota";

import Datamap from "../../utils/datamap";
import Encryption from "../../utils/encryption";

const performPowEpic = (action$, store) => {
  return action$
    .ofType(treasureHuntActions.TREASURE_HUNT_PERFORM_POW)
    .mergeMap(action => {
      const { treasureHunt } = store.getState();
      const {
        address,
        message,
        treasureFound,
        chunkIdx,
        chainIdx,
        numberOfChunks
      } = treasureHunt;

      // TODO: change this
      const value = 0;
      const tag = "EDMUNDANDREBELWUZHERE";
      const seed =
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

      return Observable.fromPromise(iota.getTransactionsToApprove(1))
        .mergeMap(
          ({ trunkTransaction: trunkTx, branchTransaction: branchTx }) =>
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
            () => !treasureFound,
            Observable.of(
              treasureHuntActions.unlockTreasure({
                address,
                chainIdx,
                numberOfChunks
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

const unlockTreasureEpic = (action$, store) => {
  return action$
    .ofType(treasureHuntActions.TREASURE_HUNT_UNLOCK_TREASURE)
    .mergeMap(action => {
      const { address, chainIdx, numberOfChunks } = action.payload;
      return Observable.fromPromise(
        iota.findMostRecentTransaction(address)
      ).mergeMap(transaction => {
        const message = transaction.signatureMessageFragment;
      });
    });
};

export default combineEpics(performPowEpic);
// export default combineEpics(performPowEpic, unlockTreasureEpic);
