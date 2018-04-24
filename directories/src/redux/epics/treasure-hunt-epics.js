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

const treasureHuntEpic = (action$, store) => {
  return action$
    .ofType(treasureHuntActions.TREASURE_HUNT_INITIALIZE)
    .mergeMap(action => {});
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

export default combineEpics(treasureHuntEpic, treasureClaimEpic);
