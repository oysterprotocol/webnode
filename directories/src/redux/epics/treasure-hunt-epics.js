import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import moment from "moment";
import _ from "lodash";

import treasureHuntActions from "../actions/treasure-hunt-actions";
import nodeSelectors from "../selectors/node-selectors";
import brokerNode from "../services/broker-node";
import iota from "../services/iota";

import Datamap from "../../utils/datamap";
import AppUtils from "../../utils/app";

// TODO remove this when we get the Go API done
import powActions from "../actions/pow-actions";

import { SECTOR_STATUS, CHUNKS_PER_SECTOR } from "../../config/";

const performPowEpic = (action$, store) => {
  return action$
    .ofType(treasureHuntActions.TREASURE_HUNT_PERFORM_POW)
    .mergeMap(action => {
      const { treasureHunt } = store.getState();
      const { address, message, treasureFound, chunkIdx } = treasureHunt;

      // TODO: change this
      const value = 0;
      const tag = "EDMUNDANDREBELWUZHERE";
      const seed =
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

      return Observable.fromPromise(iota.getTransactionsToApprove()).mergeMap({
        trunkTransaction,
        branchTransaction
      } =>
        Observable.fromPromise(
          iota.prepareTransfers({ address, message, value, tag, seed })
        ).map(trytes => {
          return { trytes, branchTransaction, trunkTransaction };
        });
      )
      .mergeMap({ trytes, branchTransaction, trunkTransaction } =>
        Observable.fromPromise(
          iota.localPow({
            branchTransaction,
            trunkTransaction,
            mwm: 14,
            trytes
          })
        )
      ).mergeMap(trytesArray =>
        Observable.fromPromise(iota.broadcastTransactions(trytesArray))
      ).mergeMap(() => {
          Observable.if(
            () => treasureFound,
            Observable.of(treasureHuntActions.updateChunkIdx(chunkIdx+1)),
            Observable.of(treasureHuntActions.unlockTreasure({ address, chainIdx: 0 })),
          )
        })
      .catch(error => {
        console.log("BROKER NODE ADDRESS FETCH ERROR", error);
        return Observable.empty();
      });
    });
};

export default combineEpics(performPowEpic);
