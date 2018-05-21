import { createSelector } from "reselect";
import _ from "lodash";

import { SECTOR_STATUS } from "../../config/";
const { UNCLAIMED, CLAIMED } = SECTOR_STATUS;

const getNewGenesisHashes = state => state.node.newGenesisHashes;

const treasureHuntableGenesisHash = createSelector(
  [getNewGenesisHashes],
  newGenesisHashes => {
    return _.find(newGenesisHashes, gh => {
      return _.find(gh.sectors, sector =>
        _.includes([UNCLAIMED, CLAIMED], sector.status)
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

export default {
  treasureHuntableGenesisHash,
  treasureHuntableSector
};
