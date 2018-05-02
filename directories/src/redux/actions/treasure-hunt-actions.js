export const TREASURE_HUNT_CLAIM = "directories/treasure_hunt/claim_treasure";
export const TREASURE_HUNT_CLAIM_COMPLETE =
  "directories/treasure_hunt/complete_claim_treasure";
export const TREASURE_HUNT_PERFORM_POW =
  "directories/treasure_hunt/perform_pow";
export const TREASURE_HUNT_FIND_TREASURE =
  "directories/treasure_hunt/find_treasure";
export const TREASURE_HUNT_SAVE_TREASURE =
  "directories/treasure_hunt/save_treasure";

const ACTIONS = Object.freeze({
  // actions
  TREASURE_HUNT_PERFORM_POW,
  TREASURE_HUNT_CLAIM,
  TREASURE_HUNT_CLAIM_COMPLETE,
  TREASURE_HUNT_FIND_TREASURE,
  TREASURE_HUNT_SAVE_TREASURE,

  // actionCreators
  performPow: ({
    address,
    message,
    genesisHash,
    sectorIdx,
    numberOfChunks
  }) => ({
    type: TREASURE_HUNT_PERFORM_POW,
    payload: { address, message, genesisHash, sectorIdx, numberOfChunks }
  }),
  findTreasure: ({ address, chunkIdx }) => ({
    type: TREASURE_HUNT_FIND_TREASURE,
    payload: { address, chunkIdx }
  }),
  saveTreasure: ({ treasure, nextChunkIdx }) => ({
    type: TREASURE_HUNT_SAVE_TREASURE,
    payload: { treasure, nextChunkIdx }
  }),
  treasureClaim: () => ({
    type: TREASURE_HUNT_CLAIM
  }),

  treasureClaimComplete: () => ({
    type: TREASURE_HUNT_CLAIM_COMPLETE
  })
});

export default ACTIONS;
