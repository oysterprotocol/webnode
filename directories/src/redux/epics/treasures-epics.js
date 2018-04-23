import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import moment from "moment";
import _ from "lodash";

import nodeActions from "../actions/node-actions";

import brokerNode from "../services/broker-node";
import iota from "../services/iota";
import ethereum from "../services/ethereum";

const claimTreasureEpic = (action$, store) => {
  return action$.ofType(nodeActions.NODE_CLAIM_TREASURE).mergeMap(action => {
    return Observable.fromPromise(brokerNode.treasures())
      .mergeMap(({ data }) => {
        const {
          receiverEthAdd,
          treasure: { genesisHash, sectorIdx, ethAddr, ethKey }
        } = data;

        const specialChunkAddress =
          "HT9MZQXKVBVT9AYVTISCLELYWXTILJDIMHFQRGS9YIJUIRSSNRZFIZCHYHQHKZIPGYYCSUSARFNSXD9UY";

        return Observable.fromPromise(
          iota.checkIfClaimed(specialChunkAddress)
        ).mergeMap(isClaimed => {
          if (!isClaimed) {
            const from = "";
            const to = "";
            return {
              receiverEthAdd,
              genesisHash,
              sectorIdx,
              ethAddr,
              ethKey,
              from,
              to
            };
          } else {
            return Observable.empty();
          }
        });
      })
      .mergeMap(
        ({
          receiverEthAdd,
          genesisHash,
          sectorIdx,
          ethAddr,
          ethKey,
          from,
          to
        }) =>
          Observable.fromPromise(
            ethereum.subsribeToClaim(from, to)
          ).map(result => {
            return nodeActions.completeClaimTreasure();
          })
      );
  });
};

export default combineEpics(claimTreasureEpic);
