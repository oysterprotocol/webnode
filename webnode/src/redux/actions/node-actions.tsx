import { ActionCreator } from "redux";
import {
  AddBrokerNodeType,
  AddNewGenesisHashType,
  ResetNodeType,
  ResumeOrStartNewSectorType,
  CheckIfSectorClaimedType,
  MarkSectorAsClaimedType,

  InitializeAction,
  SetOwnerEthAddressAction,
  DetermineBrokerNodeOrGenesisHashAction,
  DetermineGenesisHashOrTreasureHuntAction,
  RequestBrokerNodesAction,
  RequestGenesisHashesAction,
  AddBrokerNodeAction,
  AddNewGenesisHashAction,
  ResetNodeAction,
  ResumeOrStartNewSectorAction,
  CheckIfSectorClaimedAction,
  MarkSectorAsClaimedAction
} from "../../types";

export const NODE_INITIALIZE = "directories/node/initialize";
export const NODE_SET_OWNER_ETH_ADDRESS =
  "directories/node/set_owner_eth_address";
export const NODE_DETERMINE_BROKER_NODE_OR_GENESIS_HASH =
  "directories/node/determine_broker_node_or_genesis_hash";
export const NODE_DETERMINE_GENESIS_HASH_OR_TREASURE_HUNT =
  "directories/node/determine_genesis_hash_or_treasure_hunt";
export const NODE_REQUEST_BROKER_NODES =
  "directories/node/request_broker_nodes";
export const NODE_REQUEST_GENESIS_HASHES =
  "directories/node/request_genesis_hashes";

export const NODE_ADD_BROKER_NODE = "directories/node/add_broker_node";
export const NODE_ADD_NEW_GENESIS_HASH =
  "directories/node/add_new_genesis_hash";
export const NODE_RESET = "directories/node/reset";
export const NODE_RESUME_OR_START_NEW_SECTOR =
  "directories/node/resume_or_start_new_sector";
export const NODE_CHECK_IF_SECTOR_CLAIMED =
  "directories/node/check_if_sector_claimed";
export const NODE_MARK_SECTOR_AS_CLAIMED =
  "directories/node/mark_sector_as_claimed";

export const initialize: ActionCreator<InitializeAction> = () => ({
  type: NODE_INITIALIZE
});

export const setOwnerEthAddress: ActionCreator<SetOwnerEthAddressAction> = (ethAddress: string) => ({
  type: NODE_SET_OWNER_ETH_ADDRESS,
  payload: {
    ethAddress
  },
});

export const determineBrokerNodeOrGenesisHash: ActionCreator<DetermineBrokerNodeOrGenesisHashAction> = () => ({
  type: NODE_DETERMINE_BROKER_NODE_OR_GENESIS_HASH
});

export const determineGenesisHashOrTreasureHunt: ActionCreator<DetermineGenesisHashOrTreasureHuntAction> = () => ({
  type: NODE_DETERMINE_GENESIS_HASH_OR_TREASURE_HUNT
});

export const requestBrokerNodes: ActionCreator<RequestBrokerNodesAction> = () => ({
  type: NODE_REQUEST_BROKER_NODES
});

export const requestGenesisHashes: ActionCreator<RequestGenesisHashesAction> = () => ({
  type: NODE_REQUEST_GENESIS_HASHES
});

export const addBrokerNode: ActionCreator<AddBrokerNodeAction> = (obj: AddBrokerNodeType) => ({
  type: NODE_ADD_BROKER_NODE,
  payload: { obj }
});

export const addNewGenesisHash: ActionCreator<AddNewGenesisHashAction> = (obj: AddNewGenesisHashType) => ({
  type: NODE_ADD_NEW_GENESIS_HASH,
  payload: { obj }
});

export const resetNode: ActionCreator<ResetNodeAction> = (obj: ResetNodeType) => ({
  type: NODE_RESET,
  payload: { obj }
});

export const resumeOrStartNewSector: ActionCreator<ResumeOrStartNewSectorAction> = (obj: ResumeOrStartNewSectorType) => ({
  type: NODE_RESUME_OR_START_NEW_SECTOR,
  payload: { obj }
});


export const checkIfSectorClaimed: ActionCreator<CheckIfSectorClaimedAction> = (obj: CheckIfSectorClaimedType) => ({
  type: NODE_CHECK_IF_SECTOR_CLAIMED,
  payload: { obj }
});

export const markSectorAsClaimed: ActionCreator<MarkSectorAsClaimedAction> = (obj: MarkSectorAsClaimedType) => ({
  type: NODE_MARK_SECTOR_AS_CLAIMED,
  payload: { obj }
});

const ACTIONS = Object.freeze({
  // actions
  NODE_INITIALIZE,
  NODE_SET_OWNER_ETH_ADDRESS,
  NODE_DETERMINE_BROKER_NODE_OR_GENESIS_HASH,
  NODE_DETERMINE_GENESIS_HASH_OR_TREASURE_HUNT,
  NODE_REQUEST_BROKER_NODES,
  NODE_REQUEST_GENESIS_HASHES,
  NODE_ADD_BROKER_NODE,
  NODE_ADD_NEW_GENESIS_HASH,
  NODE_RESET,
  NODE_RESUME_OR_START_NEW_SECTOR,
  NODE_CHECK_IF_SECTOR_CLAIMED,
  NODE_MARK_SECTOR_AS_CLAIMED,

  // actionCreators
  initialize,
  setOwnerEthAddress,
  determineBrokerNodeOrGenesisHash,
  determineGenesisHashOrTreasureHunt,
  requestBrokerNodes,
  requestGenesisHashes,
  addBrokerNode,
  addNewGenesisHash,
  resetNode,
  resumeOrStartNewSector,
  checkIfSectorClaimed,
  markSectorAsClaimed
});

export default ACTIONS;
