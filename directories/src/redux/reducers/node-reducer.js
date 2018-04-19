import _ from "lodash";

import {
  NODE_ADD_BROKER_NODE,
  NODE_ADD_NEW_GENESIS_HASH,
  NODE_RESET
} from "../actions/node-actions";

import { CHUNKS_PER_SECTOR, SECTOR_STATUS } from "../../config/";

const initState = {
  brokerNodes: [],
  newGenesisHashes: [],
  oldGenesisHashes: [],
  id: null,
  lastResetAt: new Date()
};

const brokerNodeGenerator = address => {
  return { address };
};

const newGenesisHashGenerator = (genesisHash, numberOfChunks) => {
  const numberOfSectors = Math.ceil(numberOfChunks / CHUNKS_PER_SECTOR);
  const sectors = _.range(numberOfSectors).map(index => {
    return {
      index,
      status: SECTOR_STATUS.NOT_STARTED
    };
  });
  return { genesisHash, numberOfChunks, sectors, currentChunkIdx: 0 };
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
