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
      const { genesisHash, sectorIndex, numberOfChunks } = action.payload;
      const sectorStartingIdx = sectorIndex * CHUNKS_PER_SECTOR;
      if (
        genesisHash === state.genesisHash &&
        sectorIndex === state.sectorIndex
      ) {
        // start from where webnode left off if it's the same same
        // genesis hash and same sector index
        return {
          ...state,
          chunkIdx: Math.max(state.chunkIdx, sectorStartingIdx)
        };
      } else {
        return {
          ...state,
          genesisHash,
          sectorIndex,
          numberOfChunks,
          treasureFound: false,
          chunkIdx: sectorStartingIdx
        };
      }
    default:
      return { ...state };
  }
};
