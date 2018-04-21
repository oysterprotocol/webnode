import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import moment from "moment";
import _ from "lodash";

import nodeActions from "../actions/node-actions";

import brokerNode from "../services/broker-node";
import iota from "../services/iota";
import ethereum from "../services/ethereum";

const claimTreasureEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_CLAIM_TREASURE)
    .mergeMap((action) => {
      return Observable.fromPromise(
        brokerNode.treasures()
      )
      .mergeMap(({ data }) => {
        const {
          receiverEthAdd,
          treasure: { genesisHash, sectorIdx, ethAddr, ethKey }
        } = data;

        // TODO: change this
        const value = 0;
        const tag = "EDMUNDANDREBELWUZHERE";
        const seed =
          "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

        const contracts = "";
        const contractName = "";
        const contractAddress = "";

        return Observable.fromPromise(
          iota.prepareTransfers({ ethAddr, genesisHash, value, tag, seed })
        ).map(trytes => {
          return { receiverEthAdd, genesisHash, sectorIdx, ethAddr, ethKey, contracts, contractName, contractAddress };
        });
      })
      .mergeMap(({ receiverEthAdd, genesisHash, sectorIdx, ethAddr, ethKey, contracts, contractName, contractAddress}) =>
        Observable.fromPromise(
          ethereum.subsribeToClaim(contracts, contractName, contractAddress)
        ).map(result => {
          return nodeActions.completeClaimTreasure();
        })
      )
    });
};

export default combineEpics(
  claimTreasureEpic
);