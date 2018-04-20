export const TREASURE_HUNT_INITIALIZE = "directories/treasure_hunt/initiailize";

const ACTIONS = Object.freeze({
  // actions
  TREASURE_HUNT_INITIALIZE,

  // actionCreators
  initiailize: ({ genesisHash, sectorIndex, numberOfChunks }) => ({
    type: TREASURE_HUNT_INITIALIZE,
    payload: { genesisHash, sectorIndex, numberOfChunks }
  })
});

export default ACTIONS;
