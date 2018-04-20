import _ from "lodash";

import {
  NODE_ADD_BROKER_NODE,
  NODE_ADD_NEW_GENESIS_HASH,
  NODE_RESET,
  NODE_MARK_SECTOR_AS_CLAIMED_BY_OTHER_NODE
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
  const sectorIndexes = _.range(numberOfSectors);
  const sectors = _.chain(sectorIndexes)
    .map(index => {
      return {
        index,
        status: SECTOR_STATUS.NOT_STARTED
      };
    })
    .shuffle()
    .value();
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

    case NODE_MARK_SECTOR_AS_CLAIMED_BY_OTHER_NODE:
      const { genesisHash: gh, sectorIndex } = action.payload;
      const updatedGenesisHashes = _.map(
        state.newGenesisHashes,
        newGenesisHash => {
          if (newGenesisHash.genesisHash === gh) {
            const updatedSectors = _.map(newGenesisHash.sectors, sector => {
              if (sector.index === sectorIndex) {
                return {
                  ...sector,
                  status: SECTOR_STATUS.CLAIMED_BY_OTHER_NODE
                };
              } else {
                return { ...sector };
              }
            });
            return { ...newGenesisHash, sectors: updatedSectors };
          } else {
            return { ...newGenesisHash };
          }
        }
      );
      return {
        ...state,
        newGenesisHashes: updatedGenesisHashes
      };

    default:
      return { ...state };
  }
};
