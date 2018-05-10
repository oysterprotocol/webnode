import { createSelector } from "reselect";
import _ from "lodash";

import { SECTOR_STATUS } from "../../config/";
const { NOT_STARTED, SEARCHING, TREASURE_FOUND } = SECTOR_STATUS;

const getNewGenesisHashes = state => state.node.newGenesisHashes;

const treasureHuntableGenesisHash = createSelector(
  [getNewGenesisHashes],
  newGenesisHashes => {
    return _.find(newGenesisHashes, gh => {
      return _.find(gh.sectors, sector =>
        _.includes([NOT_STARTED, SEARCHING, TREASURE_FOUND], sector.status)
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

    return _.find(
      genesisHash.sectors,
      sector =>
        sector.status === TREASURE_FOUND ||
        sector.status === SEARCHING ||
        sector.status === NOT_STARTED
    );
  }
);

export default {
  treasureHuntableGenesisHash,
  treasureHuntableSector
};
