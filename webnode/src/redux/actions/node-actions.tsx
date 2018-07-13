import { action } from "typesafe-actions";
import {
  AddBrokerNodeType,
  AddNewGenesisHashType,
  ResetNodeType,
  ResumeOrStartNewSectorType,
  CheckIfSectorClaimedType,
  MarkSectorAsClaimedType
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
  initialize: () => action(NODE_INITIALIZE),

  setOwnerEthAddress: (ethAddress: string) =>
    action(NODE_SET_OWNER_ETH_ADDRESS, { payload: ethAddress }),

  determineBrokerNodeOrGenesisHash: () =>
    action(NODE_DETERMINE_BROKER_NODE_OR_GENESIS_HASH),

  determineGenesisHashOrTreasureHunt: () =>
    action(NODE_DETERMINE_GENESIS_HASH_OR_TREASURE_HUNT),

  requestBrokerNodes: () => action(NODE_REQUEST_BROKER_NODES),

  requestGenesisHashes: () => action(NODE_REQUEST_GENESIS_HASHES),

  addBrokerNode: (obj: AddBrokerNodeType) =>
    action(NODE_ADD_BROKER_NODE, { payload: obj }),

  addNewGenesisHash: (obj: AddNewGenesisHashType) =>
    action(NODE_ADD_NEW_GENESIS_HASH, { payload: obj }),

  resetNode: (obj: ResetNodeType) => action(NODE_RESET, { payload: obj }),

  resumeOrStartNewSector: (obj: ResumeOrStartNewSectorType) =>
    action(NODE_RESUME_OR_START_NEW_SECTOR, { payload: obj }),

  checkIfSectorClaimed: (obj: CheckIfSectorClaimedType) =>
    action(NODE_CHECK_IF_SECTOR_CLAIMED, { payload: obj }),

  markSectorAsClaimed: (obj: MarkSectorAsClaimedType) =>
    action(NODE_MARK_SECTOR_AS_CLAIMED, { payload: obj })
});

export default ACTIONS;
