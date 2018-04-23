export const TREASURE_HUNT_PERFORM_POW =
  "directories/treasure_hunt/perform_pow";
export const TREASURE_HUNT_UPDATE_CHUNK_IDX =
  "directories/treasure_hunt/update_chunk_idx";
export const TREASURE_HUNT_UNLOCK_TREASURE =
  "directories/treasure_hunt/unlock_treasure";

const ACTIONS = Object.freeze({
  // actions
  TREASURE_HUNT_PERFORM_POW,
  TREASURE_HUNT_UPDATE_CHUNK_IDX,

  // actionCreators
  performPow: ({
    address,
    message,
    genesisHash,
    sectorIndex,
    numberOfChunks
  }) => ({
    type: TREASURE_HUNT_PERFORM_POW,
    payload: { address, message, genesisHash, sectorIndex, numberOfChunks }
  }),
  updateChunkIdx: chunkIdx => ({
    type: TREASURE_HUNT_UPDATE_CHUNK_IDX,
    payload: chunkIdx
  }),
  unlockTreasure: ({ address, chainIdx }) => ({
    type: TREASURE_HUNT_UNLOCK_TREASURE,
    payload: { address, chainIdx }
  })
});

export default ACTIONS;
