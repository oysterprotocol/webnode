export const TREASURE_HUNT_CLAIM = "directories/treasure_hunt/claim_treasure";
export const TREASURE_HUNT_CLAIM_COMPLETE =
  "directories/treasure_hunt/complete_claim_treasure";
export const TREASURE_HUNT_PERFORM_POW =
  "directories/treasure_hunt/perform_pow";
export const TREASURE_HUNT_FIND_TREASURE =
  "directories/treasure_hunt/find_treasure";
export const TREASURE_HUNT_SAVE_TREASURE =
  "directories/treasure_hunt/save_treasure";
export const TREASURE_HUNT_INCREMENT_CHUNK =
  "directories/treasure_hunt/increment_chunk";

const ACTIONS = Object.freeze({
  // actions
  TREASURE_HUNT_PERFORM_POW,
  TREASURE_HUNT_CLAIM,
  TREASURE_HUNT_CLAIM_COMPLETE,
  TREASURE_HUNT_FIND_TREASURE,
  TREASURE_HUNT_SAVE_TREASURE,
  TREASURE_HUNT_INCREMENT_CHUNK,

  // actionCreators
  performPow: ({
    address,
    message,
    genesisHash,
    sectorIdx,
    numberOfChunks
  }) => ({
    type: TREASURE_HUNT_PERFORM_POW,
    payload: { address, genesisHash, sectorIdx, numberOfChunks }
  }),
  findTreasure: ({ address, chunkIdx }) => ({
    type: TREASURE_HUNT_FIND_TREASURE,
    payload: { address, chunkIdx }
  }),
  saveTreasure: ({ treasure, nextChunkIdx, nextAddress }) => ({
    type: TREASURE_HUNT_SAVE_TREASURE,
    payload: { treasure, nextChunkIdx, nextAddress }
  }),
  incrementChunk: ({ nextChunkIdx, nextAddress }) => ({
    type: TREASURE_HUNT_INCREMENT_CHUNK,
    payload: { nextChunkIdx, nextAddress }
  }),
  treasureClaim: () => ({
    type: TREASURE_HUNT_CLAIM
  }),

  treasureClaimComplete: () => ({
    type: TREASURE_HUNT_CLAIM_COMPLETE
  })
});

export default ACTIONS;
