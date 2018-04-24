export const TREASURE_HUNT_INITIALIZE = "directories/treasure_hunt/initiailize";
export const TREASURE_CLAIM = "directories/treasure_hunt/claim_treasure";
export const TREASURE_CLAIM_COMPLETE = "directories/treasure_hunt/complete_claim_treasure";

const ACTIONS = Object.freeze({
  // actions
  TREASURE_HUNT_INITIALIZE,
  TREASURE_CLAIM,
  TREASURE_CLAIM_COMPLETE,

  // actionCreators
  initialize: ({ genesisHash, sectorIndex, numberOfChunks }) => ({
    type: TREASURE_HUNT_INITIALIZE,
    payload: { genesisHash, sectorIndex, numberOfChunks }
  }),

  treasureClaim: () => ({
    type: TREASURE_CLAIM
  }),

  treasureClaimComplete: () => ({
    type: TREASURE_CLAIM_COMPLETE
  })
});

export default ACTIONS;
