import { API_ROOT_URL, SECTOR_STATUS } from "../../config/";
import nodeSelectors from "./node-selectors";

const { UNCLAIMED, CLAIMED } = SECTOR_STATUS;

test("node-selectors", () => {
  const lastResetAt = new Date();
  let state = {
    node: {
      brokerNodes: [{ address: "first address" }, { address: "b" }],
      newGenesisHashes: [
        {
          genesisHash: "claimed 1",
          sectors: [CLAIMED]
        },
        {
          genesisHash: "unclaimed 1",
          sectors: [CLAIMED, UNCLAIMED]
        },
        {
          genesisHash: "claimed 2",
          sectors: [CLAIMED]
        }
      ],
      oldGenesisHashes: [],
      id: null,
      lastResetAt: lastResetAt
    }
  };

  const treasureHuntableGenesisHashExpected = {
    genesisHash: "unclaimed 1",
    sectors: [CLAIMED, UNCLAIMED]
  };

  const treasureHuntableSectorExpected = 1;

  const brokerNodeUrlExpected = "first address";
  expect(nodeSelectors.treasureHuntableGenesisHash(state)).toEqual(
    treasureHuntableGenesisHashExpected
  );

  expect(nodeSelectors.treasureHuntableSector(state)).toEqual(
    treasureHuntableSectorExpected
  );

  expect(nodeSelectors.brokerNodeUrl(state)).toEqual(brokerNodeUrlExpected);

  state = {
    node: {
      brokerNodes: []
    }
  };

  expect(nodeSelectors.brokerNodeUrl(state)).toEqual(API_ROOT_URL);
});
