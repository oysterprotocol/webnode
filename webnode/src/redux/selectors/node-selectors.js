import { createSelector } from "reselect";
import _ from "lodash";

import { API_ROOT_URL, SECTOR_STATUS } from "../../config/";
const { UNCLAIMED } = SECTOR_STATUS;

const getNewGenesisHashes = state => state.node.newGenesisHashes;
const getBrokerNodes = state => state.node.brokerNodes;

const treasureHuntableGenesisHash = createSelector(
  [getNewGenesisHashes],
  newGenesisHashes => {
    return _.find(newGenesisHashes, gh => {
      return _.find(gh.sectors, sector =>
        _.includes([UNCLAIMED], sector.status)
      );
    });
  }
);

const treasureHuntableSector = createSelector(
  [treasureHuntableGenesisHash],
  genesisHash => {
    if (!genesisHash) {
      return null;
    }

    return _.find(genesisHash.sectors, sector => sector.status === UNCLAIMED);
  }
);

const brokerNodeUrl = createSelector([getBrokerNodes], brokerNodes => {
  return brokerNodes.length ? brokerNodes[0] : API_ROOT_URL;
});

export default {
  treasureHuntableGenesisHash,
  treasureHuntableSector,
  brokerNodeUrl
};
