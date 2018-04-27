import {
  TREASURE_HUNT_PERFORM_POW,
  TREASURE_HUNT_UNLOCK_TREASURE
} from "../actions/treasure-hunt-actions";

import { CHUNKS_PER_SECTOR } from "../../config/";

const initState = {
  address: null,
  genesisHash: null,
  message: null,
  chainIdx: 0,
  chunkIdx: 0,
  numberOfChunks: 1,
  sectorIndex: 0,
  treasureFound: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case TREASURE_HUNT_PERFORM_POW:
      const {
        address,
        message,
        genesisHash,
        sectorIndex,
        numberOfChunks
      } = action.payload;
      if (
        genesisHash === state.genesisHash &&
        sectorIndex === state.sectorIndex
      ) {
        // start from where webnode left off if it's the same
        // genesis hash and same sector index
        return {
          ...state
        };
      } else {
        const sectorStartingIdx = sectorIndex * CHUNKS_PER_SECTOR;
        return {
          ...state,
          address,
          message,
          genesisHash,
          sectorIndex,
          numberOfChunks,
          treasureFound: false,
          chunkIdx: sectorStartingIdx,
          chainIdx: 0
        };
      }

    case TREASURE_HUNT_UNLOCK_TREASURE:
      const chainIdx = action.payload;
      return {
        ...state,
        address,
        chainIdx
      };

    default:
      return { ...state };
  }
};
