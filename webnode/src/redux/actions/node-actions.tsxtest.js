import actions from "./node-actions";
import { SECTOR_STATUS } from "../../config/";

const { CLAIMED } = SECTOR_STATUS;

test("node-action NODE_DETERMINE_BROKER_NODE_OR_GENESIS_HASH", () => {
  const expected = {
    type: actions.NODE_DETERMINE_BROKER_NODE_OR_GENESIS_HASH
  };
  expect(actions.determineBrokerNodeOrGenesisHash()).toEqual(expected);
});

test("node-action NODE_DETERMINE_GENESIS_HASH_OR_TREASURE_HUNT", () => {
  const expected = {
    type: actions.NODE_DETERMINE_GENESIS_HASH_OR_TREASURE_HUNT
  };
  expect(actions.determineGenesisHashOrTreasureHunt()).toEqual(expected);
});

test("node-action NODE_REQUEST_BROKER_NODES", () => {
  const expected = {
    type: actions.NODE_REQUEST_BROKER_NODES
  };
  expect(actions.requestBrokerNodes()).toEqual(expected);
});

test("node-action NODE_REQUEST_GENESIS_HASHES", () => {
  const expected = {
    type: actions.NODE_REQUEST_GENESIS_HASHES
  };
  expect(actions.requestGenesisHashes()).toEqual(expected);
});

test("node-action NODE_ADD_BROKER_NODE", () => {
  const address = "address";
  const expected = {
    type: actions.NODE_ADD_BROKER_NODE,
    payload: {
      address: address
    }
  };
  expect(actions.addBrokerNode({ address })).toEqual(expected);
});

test("node-action NODE_ADD_NEW_GENESIS_HASH", () => {
  const genesisHash = "address";
  const numberOfChunks = 11;
  const expected = {
    type: actions.NODE_ADD_NEW_GENESIS_HASH,
    payload: {
      genesisHash: genesisHash,
      numberOfChunks: numberOfChunks
    }
  };
  expect(actions.addNewGenesisHash({ genesisHash, numberOfChunks })).toEqual(
    expected
  );
});

test("node-action NODE_RESET", () => {
  const id = 25;
  const lastResetAt = new Date();
  const expected = {
    type: actions.NODE_RESET,
    payload: {
      id: id,
      lastResetAt: lastResetAt
    }
  };
  expect(actions.resetNode({ id, lastResetAt })).toEqual(expected);
});

test("node-action NODE_CHECK_IF_SECTOR_CLAIMED", () => {
  const genesisHash = "address";
  const sectorIdx = 2;
  const numberOfChunks = 11;
  const expected = {
    type: actions.NODE_CHECK_IF_SECTOR_CLAIMED,
    payload: {
      genesisHash: genesisHash,
      sectorIdx: sectorIdx,
      numberOfChunks: numberOfChunks
    }
  };
  expect(
    actions.checkIfSectorClaimed({ genesisHash, sectorIdx, numberOfChunks })
  ).toEqual(expected);
});

test("node-action NODE_UPDATE_SECTOR_STATUS", () => {
  const genesisHash = "address";
  const sectorIdx = 2;
  const status = CLAIMED;
  const expected = {
    type: actions.NODE_UPDATE_SECTOR_STATUS,
    payload: {
      genesisHash,
      sectorIdx,
      status
    }
  };
  expect(
    actions.updateSectorStatus({ genesisHash, sectorIdx, status })
  ).toEqual(expected);
});
