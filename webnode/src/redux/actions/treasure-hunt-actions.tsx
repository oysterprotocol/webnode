import { action } from "typesafe-actions";

import { 
  StartSectorType,
  FindTreasureType,
  SaveTreasureType,
  IncrementChunkType,
  ClaimTreasureType,
  ClaimTreasureSuccessType,
} from "../../types";

export const TREASURE_HUNT_CLAIM_TREASURE =
  "directories/treasure_hunt/claim_treasure";
export const TREASURE_HUNT_CLAIM_TREASURE_SUCCESS =
  "directories/treasure_hunt/claim_treasure_success";
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
  TREASURE_HUNT_CLAIM_TREASURE,
  TREASURE_HUNT_CLAIM_TREASURE_SUCCESS,
  TREASURE_HUNT_FIND_TREASURE,
  TREASURE_HUNT_SAVE_TREASURE,
  TREASURE_HUNT_INCREMENT_CHUNK,

  // actionCreators
  startSector: (obj: StartSectorType) =>
    action(TREASURE_HUNT_START_SECTOR, { payload: obj }),

  performPow: () => action(TREASURE_HUNT_PERFORM_POW),

  findTreasure: (obj: FindTreasureType) =>
    action(TREASURE_HUNT_FIND_TREASURE, { payload: obj }),

  saveTreasure: (obj: SaveTreasureType) =>
    action(TREASURE_HUNT_SAVE_TREASURE, { payload: obj }),

  incrementChunk: (obj: IncrementChunkType) =>
    action(TREASURE_HUNT_INCREMENT_CHUNK, { payload: obj }),

  claimTreasure: (obj: ClaimTreasureType) =>
    action(TREASURE_HUNT_CLAIM_TREASURE, { payload: obj }),

  claimTreasureSuccess: (obj: ClaimTreasureSuccessType) =>
    action(TREASURE_HUNT_CLAIM_TREASURE_SUCCESS, { payload: obj })
});

export default ACTIONS;
