import { API_ROOT_URL, SECTOR_STATUS } from "../../config/";
import nodeSelectors from "./node-selectors";

const { UNCLAIMED, SEARCHING, TREASURE_FOUND, CLAIMED } = SECTOR_STATUS;

test("node-selectors", () => {
  const lastResetAt = new Date();
  let state = {
    node: {
      brokerNodes: [{ address: "first address" }, { address: "b" }],
      newGenesisHashes: [
        {
          genesisHash: "genesisHash bad",
          sectorIdx: 4,
          sectors: [{ index: 44, status: CLAIMED }]
        },
        {
          genesisHash: "genesisHash 1",
          sectorIdx: 1,
          sectors: [{ index: 11, status: UNCLAIMED }]
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
    sectors: [{ index: 11, status: "UNCLAIMED" }]
  };

  const treasureHuntableSectorExpected = {
    index: 11,
    status: "UNCLAIMED"
  };

  const brokerNodeUrlExpected = "first address";
  expect(nodeSelectors.treasureHuntableGenesisHash(state)).toEqual(
    treasureHuntableGenesisHashExpected
  );

  expect(nodeSelectors.treasureHuntableSector(state)).toEqual(
    treasureHuntableSectorExpected
  );

  expect(nodeSelectors.brokerNodeUrl(state)).toEqual(
    brokerNodeUrlExpected
  );

  state = {
    node: {
      brokerNodes: []
    }
  };

  expect(nodeSelectors.brokerNodeUrl(state)).toEqual(
    API_ROOT_URL
  );
});
