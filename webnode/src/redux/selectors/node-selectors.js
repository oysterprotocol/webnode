import { createSelector } from "reselect";
import find from "lodash/find";
import includes from "lodash/includes";

import { API_ROOT_URL, SECTOR_STATUS } from "../../config/";
const { UNCLAIMED } = SECTOR_STATUS;

const getNewGenesisHashes = state => state.node.newGenesisHashes;
const getBrokerNodes = state => state.node.brokerNodes;

const treasureHuntableGenesisHash = createSelector(
  [getNewGenesisHashes],
  newGenesisHashes => {
    return find(newGenesisHashes, gh => {
      return find(gh.sectors, sector => includes([UNCLAIMED], sector.status));
    });
  }
);

const treasureHuntableSector = createSelector(
  [treasureHuntableGenesisHash],
  genesisHash => {
    if (!genesisHash) {
      return null;
    }

    return find(genesisHash.sectors, sector => sector.status === UNCLAIMED);
  }
);

const brokerNodeUrl = createSelector([getBrokerNodes], brokerNodes => {
  return brokerNodes.length ? brokerNodes[0].address : API_ROOT_URL;
});

export default {
  treasureHuntableGenesisHash,
  treasureHuntableSector,
  brokerNodeUrl
};
