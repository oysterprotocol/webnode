export const TREASURE_HUNT_PERFORM_POW =
  "directories/treasure_hunt/perform_pow";
export const TREASURE_HUNT_UNLOCK_TREASURE =
  "directories/treasure_hunt/unlock_treasure";

const ACTIONS = Object.freeze({
  // actions
  TREASURE_HUNT_PERFORM_POW,

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
  unlockTreasure: ({ address, chainIdx }) => ({
    type: TREASURE_HUNT_UNLOCK_TREASURE,
    payload: { address, chainIdx }
  })
});

export default ACTIONS;
