import { ActionCreator } from "redux";

import { 
  StartSectorType,
  FindTreasureType,
  SaveTreasureType,
  IncrementChunkType,
  ClaimTreasureType,
  ClaimTreasureSuccessType,
  ClaimTreasureFailureType,

  StartSectorAction,
  PerformPowAction,
  FindTreasureAction,
  SaveTreasureAction,
  IncrementChunkAction,
  ClaimTreasureAction,
  ClaimTreasureSuccessAction,
  ClaimTreasureFailureAction
} from "../../types";

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
export const TREASURE_HUNT_CLAIM_TREASURE =
  "directories/treasure_hunt/claim_treasure";
export const TREASURE_HUNT_CLAIM_TREASURE_SUCCESS =
  "directories/treasure_hunt/claim_treasure_success";
export const TREASURE_HUNT_CLAIM_TREASURE_FAILURE =
  "directories/treasure_hunt/claim_treasure_failure";

export const startSector: ActionCreator<StartSectorAction> = (obj: StartSectorType) => ({
  type: TREASURE_HUNT_START_SECTOR,
  payload: { obj }
});

export const performPow: ActionCreator<PerformPowAction> = () => ({
  type: TREASURE_HUNT_PERFORM_POW
});

export const findTreasure: ActionCreator<FindTreasureAction> = (obj: FindTreasureType) => ({
  type: TREASURE_HUNT_FIND_TREASURE,
  payload: { obj }
});

export const saveTreasure: ActionCreator<SaveTreasureAction> = (obj: SaveTreasureType) => ({
  type: TREASURE_HUNT_SAVE_TREASURE,
  payload: { obj }
});

export const incrementChunk: ActionCreator<IncrementChunkAction> = (obj: IncrementChunkType) => ({
  type: TREASURE_HUNT_INCREMENT_CHUNK,
  payload: { obj }
});

export const claimTreasure: ActionCreator<ClaimTreasureAction> = (obj: ClaimTreasureType) => ({
  type: TREASURE_HUNT_CLAIM_TREASURE,
  payload: { obj }
});

export const claimTreasureSuccess: ActionCreator<ClaimTreasureSuccessAction> = (obj: ClaimTreasureSuccessType) => ({
  type: TREASURE_HUNT_CLAIM_TREASURE_SUCCESS,
  payload: { obj }
});

export const claimTreasureFailure: ActionCreator<ClaimTreasureFailureAction> = (obj: ClaimTreasureFailureType) => ({
  type: TREASURE_HUNT_CLAIM_TREASURE_FAILURE,
  payload: { obj }
});

const ACTIONS = Object.freeze({
  // actions
  TREASURE_HUNT_START_SECTOR,
  TREASURE_HUNT_PERFORM_POW,
  TREASURE_HUNT_CLAIM_TREASURE,
  TREASURE_HUNT_CLAIM_TREASURE_SUCCESS,
  TREASURE_HUNT_FIND_TREASURE,
  TREASURE_HUNT_SAVE_TREASURE,
  TREASURE_HUNT_INCREMENT_CHUNK,
  TREASURE_HUNT_CLAIM_TREASURE_FAILURE,

  // actionCreators
  startSector,
  performPow,
  findTreasure,
  saveTreasure,
  incrementChunk,
  claimTreasure,
  claimTreasureSuccess,
  claimTreasureFailure
});

export default ACTIONS;
