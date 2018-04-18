import _ from "lodash";

import {
  NODE_ADD_BROKER_NODE,
  NODE_ADD_NEW_GENESIS_HASH,
  NODE_RESET
} from "../actions/node-actions";

const initState = {
  brokerNodes: [],
  newGenesisHashes: [],
  oldGenesisHashes: [],
  id: null,
  lastResetAt: new Date()
};

const STATUS = {
  UNCLAIMED: "UNCLAIMED",
  IN_PROGRESS: "IN_PROGRESS",
  CLAIMED: "CLAIMED"
};

const brokerNodeGenerator = address => {
  return { address };
};

const newGenesisHashGenerator = (genesisHash, numberOfChunks) => {
  return { genesisHash, numberOfChunks, status: STATUS.UNCLAIMED };
};

export default (state = initState, action) => {
  switch (action.type) {
    case NODE_ADD_BROKER_NODE:
      const { address } = action.payload;
      return {
        ...state,
        brokerNodes: [...state.brokerNodes, brokerNodeGenerator(address)]
      };

    case NODE_ADD_NEW_GENESIS_HASH:
      const { genesisHash, numberOfChunks } = action.payload;
      return {
        ...state,
        newGenesisHashes: [
          ...state.newGenesisHashes,
          newGenesisHashGenerator(genesisHash, numberOfChunks)
        ]
      };

    case NODE_RESET:
      const { id, lastResetAt } = action.payload;
      return {
        ...state,
        id,
        lastResetAt,
        brokerNodes: [],
        newGenesisHashes: [],
        oldGenesisHashes: []
      };

    default:
      return { ...state };
  }
};
