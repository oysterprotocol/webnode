export const TREASURE_CLAIM = "directories/treasure_hunt/claim_treasure";
export const TREASURE_CLAIM_COMPLETE =
  "directories/treasure_hunt/complete_claim_treasure";
export const TREASURE_HUNT_PERFORM_POW =
  "directories/treasure_hunt/perform_pow";
export const TREASURE_HUNT_UNLOCK_TREASURE =
  "directories/treasure_hunt/unlock_treasure";

const ACTIONS = Object.freeze({
  // actions
  TREASURE_HUNT_PERFORM_POW,
  TREASURE_CLAIM,
  TREASURE_CLAIM_COMPLETE,

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
  unlockTreasure: ({ address, chainIdx, numberOfChunks }) => ({
    type: TREASURE_HUNT_UNLOCK_TREASURE,
    payload: { address, chainIdx, numberOfChunks }
  }),
  treasureClaim: () => ({
    type: TREASURE_CLAIM
  }),

  treasureClaimComplete: () => ({
    type: TREASURE_CLAIM_COMPLETE
  })
});

export default ACTIONS;
