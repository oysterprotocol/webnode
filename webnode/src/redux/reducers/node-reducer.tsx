import nodeActions from "../actions/node-actions";
import { Reducer } from 'redux';
import { NodeState, NodeActions } from "../../types";
import { CHUNKS_PER_SECTOR, SECTOR_STATUS } from "../../config/";

export const initState : NodeState = {
  ethAddress: {},
  brokerNodes: [],
  newGenesisHashes: [],
  oldGenesisHashes: [],
  id: null,
  lastResetAt: null,
  sectors: {}
};

const brokerNodeGenerator = (address: string) => {
  return { address };
};

const newGenesisHashGenerator = (genesisHash: string, numberOfChunks: number) => {
  const numberOfSectors = Math.ceil(numberOfChunks / CHUNKS_PER_SECTOR);
  const sectorIdxes = Array.from(new Array(numberOfSectors), (_x, i) => i);
  const sectors = sectorIdxes.map(index => {
    return {
      index,
      status: SECTOR_STATUS.UNCLAIMED
    };
  });
  return { genesisHash, numberOfChunks, sectors };
};

export const nodeReducer: Reducer<NodeState> = (state: NodeState = initState, action) => {
  switch ((action as NodeActions).type) {
    case nodeActions.NODE_SET_OWNER_ETH_ADDRESS:
      return {
        ...state,
        ethAddress: action.payload
      };

    case nodeActions.NODE_ADD_BROKER_NODE:
      const address : string = action.payload.address;
      return {
        ...state,
        brokerNodes: [...state.brokerNodes, brokerNodeGenerator(address)]
      };

    case nodeActions.NODE_ADD_NEW_GENESIS_HASH:
      const genesisHash : string = action.payload.obj.genesisHash;
      const numberOfChunks : number = action.payload.obj.numberOfChunks;
      return {
        ...state,
        newGenesisHashes: [
          ...state.newGenesisHashes,
          newGenesisHashGenerator(genesisHash, numberOfChunks)
        ]
      };

    case nodeActions.NODE_RESET:
      const id : any = action.payload.obj.id;
      const lastResetAt : any = action.payload.obj.lastResetAt;
      return {
        ...state,
        id,
        lastResetAt,
        brokerNodes: [],
        newGenesisHashes: [],
        oldGenesisHashes: []
      };

    case nodeActions.NODE_MARK_SECTOR_AS_CLAIMED:
      const gh : string = action.payload.obj.genesisHash;
      const sectorIdx: number = action.payload.obj.sectorIdx;
      const updatedGenesisHashes = state.newGenesisHashes.map(
        newGenesisHash => {
          if (newGenesisHash.genesisHash === gh) {
            const updatedSectors = newGenesisHash.sectors.map( (sector: any) => {
              if (sector.index === sectorIdx) {
                return {
                  ...sector,
                  status: SECTOR_STATUS.CLAIMED
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
      return state;
  }
};
