import { TREASURE_HUNT_SAVE_TREASURE } from "../actions/treasure-hunt-actions";
import { Reducer } from 'redux';
import { TestState, TreasureHuntActions } from "../../types";

export const initState: TestState = {
  treasures: [],
  numberOfCalls: -1 //number of calls for progress
};

export const testReducer: Reducer<TestState> = (state: TestState = initState, action) => {
  switch ((action as TreasureHuntActions).type) {
    case TREASURE_HUNT_SAVE_TREASURE: //
      const { treasure, nextChunkIdx } = action.payload.obj;
      return {
        ...state,
        treasures: [...state.treasures, { treasure, nextChunkIdx }]
      };
    case "IOTA_RETURN":
      return {
        ...state,
        numberOfCalls: state.numberOfCalls + 1
      };
    default:
      return { ...state };
  }
};
