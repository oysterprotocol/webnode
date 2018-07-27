import nodeActions from "../actions/node-actions";
import { Reducer } from 'redux';
import { PowState, PowActions } from "../../types";

export const initState: PowState = {
  powResults: [],
  statuses: ["Initializing"],
  consent: ""
};

export const powReducer: Reducer<PowState> = (state: PowState = initState, action) => {
  switch ((action as PowActions).type) {
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
