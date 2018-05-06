import {
  TREASURE_HUNT_PERFORM_POW,
  TREASURE_HUNT_FIND_TREASURE,
  TREASURE_HUNT_SAVE_TREASURE
} from "../actions/treasure-hunt-actions";

import { CHUNKS_PER_SECTOR } from "../../config/";

const initState = {
  treasures: [],

  numberOfCalls: -1
};

export default (state = initState, action) => {
  switch (action.type) {
    case TREASURE_HUNT_SAVE_TREASURE:
      const { treasure, nextChunkIdx } = action.payload;
      return {
        ...state,
        treasures: [...state.treasures, { treasure, nextChunkIdx }]
      };
    case "IOTA_RETURN":
      console.log("Works!");
      return {
        ...state,
        numberOfCalls: state.numberOfCalls + 1
      };
    default:
      return { ...state };
  }
};
