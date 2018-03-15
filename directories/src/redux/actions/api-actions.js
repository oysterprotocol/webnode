import {
  API_INIT_WORK,
  API_GIVE_PEER_ID,
  API_START_TRANSACTION,
  API_SELECT_ITEM,
  API_BROADCAST_TO_HOOKS,
  API_CONFIRM_WORK
} from "./action-types";

export const initWork = () => ({
  type: API_INIT_WORK
});

export const givePeerId = peerId => ({
  type: API_GIVE_PEER_ID,
  payload: peerId
});

export const startTransaction = data => ({
  type: API_START_TRANSACTION,
  payload: data
});

export const selectItem = item => ({
  type: API_SELECT_ITEM,
  payload: item
});

export const broadcastToHooks = (trytes, nodes) => {
  return {
    type: API_BROADCAST_TO_HOOKS,
    payload: { trytes, nodes }
  };
};

export const confirmWork = (data = "") => {
  return {
    type: API_CONFIRM_WORK,
    payload: data
  };
};
