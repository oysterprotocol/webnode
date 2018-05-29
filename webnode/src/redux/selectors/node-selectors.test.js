import { SECTOR_STATUS } from "../../config/config.dev";

import { createSelector } from "reselect";
import _ from "lodash";

const getNewGenesisHashes = state => state.node.newGenesisHashes;

const treasureHuntableGenesisHash = createSelector(
  [getNewGenesisHashes],
  newGenesisHashes => {
    return _.find(newGenesisHashes, gh => {
      return _.find(gh.sectors, sector =>
        _.includes([SECTOR_STATUS.UNCLAIMED], sector.status)
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

    return _.find(genesisHash.sectors, sector => sector.status === SECTOR_STATUS.UNCLAIMED);
  }
);

test("node-selectors", () => {
  const lastResetAt = new Date();
  const state = {
    node: {
      brokerNodes: [],
      newGenesisHashes: [
        {
          genesisHash: "genesisHash bad",
          sectorIdx: 4,
          sectors: [{ index: 44, status: SECTOR_STATUS.CLAIMED }]
        },
        {
          genesisHash: "genesisHash 1",
          sectorIdx: 1,
          sectors: [{ index: 11, status: SECTOR_STATUS.UNCLAIMED }]
        },
        {
          genesisHash: "genesisHash 2",
          sectorIdx: 2,
          sectors: [{ index: 22, status: SECTOR_STATUS.SEARCHING }]
        },
        {
          genesisHash: "genesisHash 3",
          sectorIdx: 3,
          sectors: [{ index: 33, status: SECTOR_STATUS.TREASURE_FOUND }]
        }
      ],
      oldGenesisHashes: [],
      id: null,
      lastResetAt: lastResetAt
    }
  };

  const treasureHuntableGenesisHashExpected = {
    genesisHash: "genesisHash 1",
    sectorIdx: 1,
    sectors: [{ index: 11, status: "UNCLAIMED" }]
  };

  const treasureHuntableSectorExpected = {
    index: 11,
    status: "UNCLAIMED"
  };

  expect(treasureHuntableGenesisHash(state)).toEqual(
    treasureHuntableGenesisHashExpected
  );

  expect(treasureHuntableSector(state)).toEqual(
    treasureHuntableSectorExpected
  );
});
