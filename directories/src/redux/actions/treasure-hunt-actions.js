export const TREASURE_HUNT_CLAIM = "directories/treasure_hunt/claim";
export const TREASURE_HUNT_CLAIM_SUCCESS =
  "directories/treasure_hunt/claim_success";
export const TREASURE_HUNT_START_SECTOR =
  "directories/treasure_hunt/start_sector";
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
  TREASURE_HUNT_START_SECTOR,
  TREASURE_HUNT_PERFORM_POW,
  TREASURE_HUNT_CLAIM,
  TREASURE_HUNT_CLAIM_SUCCESS,
  TREASURE_HUNT_FIND_TREASURE,
  TREASURE_HUNT_SAVE_TREASURE,
  TREASURE_HUNT_INCREMENT_CHUNK,

  // actionCreators
  startSector: ({
    dataMapHash,
    message,
    genesisHash,
    sectorIdx,
    numberOfChunks
  }) => ({
    type: TREASURE_HUNT_START_SECTOR,
    payload: { dataMapHash, genesisHash, sectorIdx, numberOfChunks }
  }),
  performPow: () => ({
    type: TREASURE_HUNT_PERFORM_POW
  }),
  findTreasure: ({ dataMapHash, chunkIdx }) => ({
    type: TREASURE_HUNT_FIND_TREASURE,
    payload: { dataMapHash, chunkIdx }
  }),
  saveTreasure: ({ treasure, nextChunkIdx, nextDataMapHash }) => ({
    type: TREASURE_HUNT_SAVE_TREASURE,
    payload: { treasure, nextChunkIdx, nextDataMapHash }
  }),
  incrementChunk: ({ nextChunkIdx, nextDataMapHash }) => ({
    type: TREASURE_HUNT_INCREMENT_CHUNK,
    payload: { nextChunkIdx, nextDataMapHash }
  }),
  claim: () => ({
    type: TREASURE_HUNT_CLAIM
  }),
  claimSuccess: () => ({
    type: TREASURE_HUNT_CLAIM_SUCCESS
  })
});

export default ACTIONS;
