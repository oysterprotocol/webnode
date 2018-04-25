import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import moment from "moment";
import _ from "lodash";

import treasureHuntActions from "../actions/treasure-hunt-actions";
import nodeSelectors from "../selectors/node-selectors";
import brokerNode from "../services/broker-node";
import iota from "../services/iota";
import ethereum from "../services/ethereum";

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
              treasureHuntActions.unlockTreasure({ address, chainIdx: 0 })
            )
          )
        )
        .catch(error => {
          console.log("TREASURE HUNTING ERROR", error);
          return Observable.empty();
        });
    });
};

const treasureClaimEpic = (action$, store) => {
  return action$.ofType(treasureHuntActions.TREASURE_CLAIM).mergeMap(action => {
    const {
      receiverEthAdd,
      treasure: { genesisHash, numChunks, sectorIdx, ethAddr, ethKey }
    } = action.payload;
    return Observable.fromPromise(
      brokerNode.treasures(
        receiverEthAdd,
        genesisHash,
        numChunks,
        sectorIdx,
        ethAddr,
        ethKey
      )
    ).mergeMap(({ data }) => {
      const from = "";
      const to = "";
      Observable.fromPromise(ethereum.subsribeToClaim(from, to)).map(result => {
        return treasureHuntActions.treasureClaimComplete();
      });
    });
  });
};

export default combineEpics(performPowEpic, treasureClaimEpic);
