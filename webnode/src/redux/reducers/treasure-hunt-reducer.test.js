import { CHUNKS_PER_SECTOR } from "../../config/";

import treasureHuntActions from "../actions/treasure-hunt-actions";
import treasureHunt from "./treasure-hunt-reducer";

test("treasure-hunt-reducer TREASURE_HUNT_START_SECTOR - sectorIdx and genesisHash == store", () => {
  const state = {
    dataMapHash: "datamap",
    genesisHash: "same-genesishash",
    chunkIdx: 0,
    numberOfChunks: 2,
    sectorIdx: "same-sectorIdx",
    treasure: null
  };

  const action = {
    type: treasureHuntActions.TREASURE_HUNT_START_SECTOR,
    payload: {
      dataMapHash: "new-datamap",
      genesisHash: "same-genesishash",
      numberOfChunks: 50,
      sectorIdx: "same-sectorIdx"
    }
  };

  const expected = state;

  expect(treasureHunt(state, action)).toEqual(expected);
});

test("treasure-hunt-reducer TREASURE_HUNT_START_SECTOR - sectorIdx and genesisHash != store", () => {
  const state = {
    dataMapHash: "datamap",
    genesisHash: "genesis",
    chunkIdx: 0,
    numberOfChunks: 2,
    sectorIdx: 111,
    treasure: null
  };

  const action = {
    type: treasureHuntActions.TREASURE_HUNT_START_SECTOR,
    payload: {
      dataMapHash: "new-datamap",
      genesisHash: 15,
      numberOfChunks: 50,
      sectorIdx: 222
    }
  };

  const expected = {
    dataMapHash: "new-datamap",
    genesisHash: 15,
    chunkIdx: 222 * CHUNKS_PER_SECTOR,
    numberOfChunks: 50,
    sectorIdx: 222,
    treasure: null
  };

  expect(treasureHunt(state, action)).toEqual(expected);
});

test("treasure-hunt-reducer TREASURE_HUNT_INCREMENT_CHUNK", () => {
  const state = {
    dataMapHash: "datamap",
    genesisHash: "genesis",
    chunkIdx: 0,
    numberOfChunks: 2,
    sectorIdx: 111,
    treasure: null
  };

  const action = {
    type: treasureHuntActions.TREASURE_HUNT_INCREMENT_CHUNK,
    payload: {
      nextChunkIdx: 22,
      nextDataMapHash: "nexthash"
    }
  };

  const expected = {
    dataMapHash: "nexthash",
    genesisHash: "genesis",
    chunkIdx: 22,
    numberOfChunks: 2,
    sectorIdx: 111,
    treasure: null
  };

  expect(treasureHunt(state, action)).toEqual(expected);
});

test("treasure-hunt-reducer TREASURE_HUNT_SAVE_TREASURE", () => {
  const state = {
    dataMapHash: "datamap",
    genesisHash: "genesis",
    chunkIdx: 0,
    numberOfChunks: 2,
    sectorIdx: 111,
    treasure: null
  };

  const action = {
    type: treasureHuntActions.TREASURE_HUNT_SAVE_TREASURE,
    payload: {
      treasure: "treasure",
      nextChunkIdx: 11,
      nextDataMapHash: "nexthash"
    }
  };

  const expected = {
    dataMapHash: "nexthash",
    genesisHash: "genesis",
    chunkIdx: 11,
    numberOfChunks: 2,
    sectorIdx: 111,
    treasure: "treasure"
  };

  expect(treasureHunt(state, action)).toEqual(expected);
});
