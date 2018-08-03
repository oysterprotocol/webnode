import nodeActions from "../actions/node-actions";
import treasureHuntActions from "../actions/treasure-hunt-actions";

const initState = {
  powResults: [],
  statuses: ["Initializing"],
  currentStatus: "Initializing"
};

export default (state = initState, action) => {
  switch (action.type) {
    case treasureHuntActions.TREASURE_HUNT_START_SECTOR:
      return {
        ...state,
        currentStatus: "Doing proof of work"
      };
    case treasureHuntActions.TREASURE_HUNT_SAVE_TREASURE:
      return {
        ...state,
        currentStatus: "Treasure found"
      };
    case nodeActions.NODE_UPDATE_SECTOR_STATUS:
      return {
        ...state,
        currentStatus: "Sector complete"
      };
    case nodeActions.NODE_REQUEST_BROKER_NODES:
      return {
        ...state,
        statuses: [...state.statuses, "Doing proof of work"]
      };
    case nodeActions.NODE_ADD_BROKER_NODE:
      return {
        ...state,
        statuses: [...state.statuses, "Complete"]
      };

    default:
      return state;
  }
};
