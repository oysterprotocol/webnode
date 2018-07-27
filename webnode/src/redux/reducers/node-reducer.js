import nodeActions from "../actions/node-actions";

import { CHUNKS_PER_SECTOR, SECTOR_STATUS } from "../../config/";

const initState = {
  ethAddress: null,
  brokerNodes: [],
  newGenesisHashes: [],
  oldGenesisHashes: [],
  id: null,
  lastResetAt: null
};

const brokerNodeGenerator = address => {
  return { address };
};

const newGenesisHashGenerator = (genesisHash, numberOfChunks) => {
  const numberOfSectors = Math.ceil(numberOfChunks / CHUNKS_PER_SECTOR);
  const sectors = Array(numberOfSectors).fill(SECTOR_STATUS.UNCLAIMED);
  return { genesisHash, numberOfChunks, sectors };
};

export default (state = initState, action) => {
  switch (action.type) {
    case nodeActions.NODE_SET_OWNER_ETH_ADDRESS:
      return {
        ...state,
        ethAddress: action.payload
      };

    case nodeActions.NODE_ADD_BROKER_NODE:
      const { address } = action.payload;
      return {
        ...state,
        brokerNodes: [...state.brokerNodes, brokerNodeGenerator(address)]
      };

    case nodeActions.NODE_ADD_NEW_GENESIS_HASH:
      const { genesisHash, numberOfChunks } = action.payload;
      return {
        ...state,
        newGenesisHashes: [
          ...state.newGenesisHashes,
          newGenesisHashGenerator(genesisHash, numberOfChunks)
        ]
      };

    case nodeActions.NODE_RESET:
      const { id, lastResetAt } = action.payload;
      return {
        ...state,
        id,
        lastResetAt,
        brokerNodes: [],
        newGenesisHashes: [],
        oldGenesisHashes: []
      };

    case nodeActions.NODE_UPDATE_SECTOR_STATUS:
      const { genesisHash: gh, sectorIdx } = action.payload;
      const updatedGenesisHashes = state.newGenesisHashes.map(
        newGenesisHash => {
          if (newGenesisHash.genesisHash === gh) {
            const updatedSectors = newGenesisHash.sectors.map(
              (status, i) => (i === sectorIdx ? SECTOR_STATUS.CLAIMED : status)
            );
            return { ...newGenesisHash, sectors: updatedSectors };
          } else {
            return newGenesisHash;
          }
        }
      );
      return {
        ...state,
        newGenesisHashes: updatedGenesisHashes
      };

    default:
      return state;
  }
};
