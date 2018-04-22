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

const treasureHuntEpic = (action$, store) => {
  return action$
    .ofType(treasureHuntActions.TREASURE_HUNT_INITIALIZE)
    .mergeMap(action => {
      const { treasureHunt } = store.getState();
      const { address } = treasureHunt;

      return Observable.fromPromise(iota.getTransactionsToApprove()).mergeMap({
        trunkTransaction,
        branchTransaction
      });
    });
};

export default combineEpics(treasureHuntEpic);
