import { TREASURE_HUNT_INITIALIZE } from "../actions/treasure-hunt-actions";

import { CHUNKS_PER_SECTOR } from "../../config/";

const initState = {
  genesisHash: null,
  chunkIdx: 0,
  numberOfChunks: 1,
  sectorIndex: 0,
  treasureFound: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case TREASURE_HUNT_INITIALIZE:
      const {
        address,
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
          genesisHash,
          sectorIndex,
          numberOfChunks,
          address,
          treasureFound: false,
          chunkIdx: sectorStartingIdx
        };
      }
    default:
      return { ...state };
  }
};
