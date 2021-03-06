import { TREASURE_HUNT_SAVE_TREASURE } from "../actions/treasure-hunt-actions";

const initState = {
  treasures: [],
  numberOfCalls: -1 //number of calls for progress
};

const testReducer = (state = initState, action) => {
  switch (action.type) {
    case TREASURE_HUNT_SAVE_TREASURE: //
      const { treasure, nextChunkIdx } = action.payload;
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

export default testReducer;
