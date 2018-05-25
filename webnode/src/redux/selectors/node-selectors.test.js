import { SECTOR_STATUS } from "../../config/";
import nodeSelectors from "./node-selectors";

const { NOT_STARTED, SEARCHING, TREASURE_FOUND, CLAIMED } = SECTOR_STATUS;

test("node-selectors", () => {
  const lastResetAt = new Date();
  const state = {
    node: {
      brokerNodes: [],
      newGenesisHashes: [
        {
          genesisHash: "genesisHash bad",
          sectorIdx: 4,
          sectors: [{ index: 44, status: CLAIMED }]
        },
        {
          genesisHash: "genesisHash 1",
          sectorIdx: 1,
          sectors: [{ index: 11, status: NOT_STARTED }]
        },
        {
          genesisHash: "genesisHash 2",
          sectorIdx: 2,
          sectors: [{ index: 22, status: SEARCHING }]
        },
        {
          genesisHash: "genesisHash 3",
          sectorIdx: 3,
          sectors: [{ index: 33, status: TREASURE_FOUND }]
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
    sectors: [{ index: 11, status: "NOT_STARTED" }]
  };

  const treasureHuntableSectorExpected = {
    index: 11,
    status: "NOT_STARTED"
  };

  expect(nodeSelectors.treasureHuntableGenesisHash(state)).toEqual(
    treasureHuntableGenesisHashExpected
  );

  expect(nodeSelectors.treasureHuntableSector(state)).toEqual(
    treasureHuntableSectorExpected
  );
});
