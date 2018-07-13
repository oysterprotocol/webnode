import node from "./node-reducer";
import nodeActions from "../actions/node-actions";

import { CHUNKS_PER_SECTOR, SECTOR_STATUS } from "../../config/";
const { CLAIMED, UNCLAIMED } = SECTOR_STATUS;

const brokerNodeGenerator = address => {
  return { address };
};

const newGenesisHashGenerator = (genesisHash, numberOfChunks) => {
  const numberOfSectors = Math.ceil(numberOfChunks / CHUNKS_PER_SECTOR);
  const sectors = Array(numberOfSectors).fill(SECTOR_STATUS.UNCLAIMED);
  return { genesisHash, numberOfChunks, sectors };
};

test("node-reducer NODE_UPDATE_SECTOR_STATUS", () => {
  const genesisHash = "genesisHash";
  const sectorIdx = 2;
  const lastResetAt = new Date();

  const state = {
    brokerNodes: [],
    newGenesisHashes: [
      {
        genesisHash: genesisHash,
        sectorIdx: sectorIdx,
        sectors: [CLAIMED, CLAIMED, UNCLAIMED]
      }
    ],
    oldGenesisHashes: [],
    id: null,
    lastResetAt: lastResetAt
  };

  const action = {
    type: nodeActions.NODE_UPDATE_SECTOR_STATUS,
    payload: {
      genesisHash: genesisHash,
      sectorIdx: sectorIdx
    }
  };

  const expected = {
    brokerNodes: [],
    newGenesisHashes: [
      {
        genesisHash: genesisHash,
        sectorIdx: sectorIdx,
        sectors: [CLAIMED, CLAIMED, CLAIMED]
      }
    ],
    oldGenesisHashes: [],
    id: null,
    lastResetAt: lastResetAt
  };

  expect(node(state, action)).toEqual(expected);
});

test("node-reducer NODE_ADD_BROKER_NODE", () => {
  const lastResetAt = new Date();
  const state = {
    brokerNodes: ["address-brokernode"],
    newGenesisHashes: [],
    oldGenesisHashes: [],
    id: null,
    lastResetAt: lastResetAt
  };

  const brokerNodesAddress = "address";

  const action = {
    type: nodeActions.NODE_ADD_BROKER_NODE,
    payload: {
      address: brokerNodesAddress
    }
  };

  const expected = {
    brokerNodes: [
      "address-brokernode",
      brokerNodeGenerator(brokerNodesAddress)
    ],
    newGenesisHashes: [],
    oldGenesisHashes: [],
    id: null,
    lastResetAt: lastResetAt
  };

  expect(node(state, action)).toEqual(expected);
});

test("node-reducer NODE_ADD_NEW_GENESIS_HASH", () => {
  const genesisHash = "genesisHash";
  const numberOfChunks = 10;
  const date = new Date();

  const state = {
    brokerNodes: [],
    newGenesisHashes: [genesisHash],
    oldGenesisHashes: [],
    id: null,
    lastResetAt: date
  };

  const action = {
    type: nodeActions.NODE_ADD_NEW_GENESIS_HASH,
    payload: {
      genesisHash: genesisHash,
      numberOfChunks: numberOfChunks
    }
  };

  const genesisHashMock = newGenesisHashGenerator(genesisHash, numberOfChunks);

  const expected = {
    brokerNodes: [],
    newGenesisHashes: [genesisHash, genesisHashMock],
    oldGenesisHashes: [],
    id: null,
    lastResetAt: date
  };

  expect(node(state, action)).toEqual(expected);
});

test("node-reducer NODE_RESET", () => {
  const state = {
    brokerNodes: ["brokerNodes"],
    newGenesisHashes: ["newGenesisHashes"],
    oldGenesisHashes: ["oldGenesisHashes"],
    id: null,
    lastResetAt: new Date()
  };

  const date = new Date() + 1;

  const action = {
    type: nodeActions.NODE_RESET,
    payload: {
      id: 11,
      lastResetAt: date
    }
  };

  const expected = {
    brokerNodes: [],
    newGenesisHashes: [],
    oldGenesisHashes: [],
    id: 11,
    lastResetAt: date
  };

  expect(node(state, action)).toEqual(expected);
});
