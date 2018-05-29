import treasureHuntActions from "../actions/treasure-hunt-actions";

import { CHUNKS_PER_SECTOR } from "../../config/config.dev";

const initState = {
  dataMapHash: null,
  genesisHash: null,
  chunkIdx: 0,
  numberOfChunks: 1,
  sectorIdx: 0,
  treasure: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case treasureHuntActions.TREASURE_HUNT_START_SECTOR:
      const {
        dataMapHash,
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
          dataMapHash,
          genesisHash,
          sectorIdx,
          numberOfChunks,
          treasure: null,
          chunkIdx: sectorStartingIdx
        };
      }

    case treasureHuntActions.TREASURE_HUNT_INCREMENT_CHUNK:
      const {
        nextChunkIdx: nxtChunkIdx,
        nextDataMapHash: nextDataMapHsh
      } = action.payload;
      return {
        ...state,
        chunkIdx: nxtChunkIdx,
        dataMapHash: nextDataMapHsh
      };

    case treasureHuntActions.TREASURE_HUNT_SAVE_TREASURE:
      const { treasure, nextChunkIdx, nextDataMapHash } = action.payload;
      return {
        ...state,
        treasure,
        chunkIdx: nextChunkIdx,
        dataMapHash: nextDataMapHash
      };

    default:
      return { ...state };
  }
};
