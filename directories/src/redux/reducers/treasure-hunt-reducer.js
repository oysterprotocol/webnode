import {
  TREASURE_HUNT_START_SECTOR,
  TREASURE_HUNT_FIND_TREASURE,
  TREASURE_HUNT_SAVE_TREASURE,
  TREASURE_HUNT_INCREMENT_CHUNK
} from "../actions/treasure-hunt-actions";

import { CHUNKS_PER_SECTOR } from "../../config/";

const initState = {
  address: null,
  genesisHash: null,
  chunkIdx: 0,
  numberOfChunks: 1,
  sectorIdx: 0,
  treasure: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case TREASURE_HUNT_START_SECTOR:
      const {
        address,
        genesisHash,
        sectorIdx,
        numberOfChunks
      } = action.payload;
      if (genesisHash === state.genesisHash && sectorIdx === state.sectorIdx) {
        // start from where webnode left off if it's the same
        // genesis hash and same sector index
        return {
          ...state
        };
      } else {
        const sectorStartingIdx = sectorIdx * CHUNKS_PER_SECTOR;
        return {
          ...state,
          address,
          genesisHash,
          sectorIdx,
          numberOfChunks,
          treasure: null,
          chunkIdx: sectorStartingIdx
        };
      }

    case TREASURE_HUNT_INCREMENT_CHUNK:
      const { nextChunkIdx: nxtChunkIdx, nextAddr } = action.payload;
      return {
        ...state,
        chunkIdx: nxtChunkIdx,
        address: nextAddr
      };

    case TREASURE_HUNT_SAVE_TREASURE:
      const { treasure, nextChunkIdx, nextAddress } = action.payload;
      return {
        ...state,
        treasure,
        chunkIdx: nextChunkIdx,
        address: nextAddress
      };

    default:
      return { ...state };
  }
};
