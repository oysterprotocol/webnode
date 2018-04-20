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
export const NODE_TREASURE_HUNT = "directories/node/treasure_hunt";
export const NODE_MARK_SECTOR_AS_CLAIMED_BY_OTHER_NODE =
  "directories/node/mark_sector_as_claimed_by_other_node";

const ACTIONS = Object.freeze({
  // actions
  NODE_DETERMINE_BROKER_NODE_OR_GENESIS_HASH,
  NODE_DETERMINE_GENESIS_HASH_OR_TREASURE_HUNT,
  NODE_REQUEST_BROKER_NODES,
  NODE_ADD_BROKER_NODE,
  NODE_REQUEST_GENESIS_HASHES,
  NODE_ADD_NEW_GENESIS_HASH,
  NODE_RESET,
  NODE_TREASURE_HUNT,
  NODE_MARK_SECTOR_AS_CLAIMED_BY_OTHER_NODE,

  // actionCreators
  determineBrokerNodeOrGenesisHash: () => ({
    type: NODE_DETERMINE_BROKER_NODE_OR_GENESIS_HASH
  }),

  determineGenesisHashOrTreasureHunt: () => ({
    type: NODE_DETERMINE_GENESIS_HASH_OR_TREASURE_HUNT
  }),

  requestBrokerNodes: () => ({
    type: NODE_REQUEST_BROKER_NODES
  }),

  addBrokerNode: ({ address }) => ({
    type: NODE_ADD_BROKER_NODE,
    payload: { address }
  }),

  requestGenesisHashes: () => ({
    type: NODE_REQUEST_GENESIS_HASHES
  }),

  addNewGenesisHash: ({ genesisHash, numberOfChunks }) => ({
    type: NODE_ADD_NEW_GENESIS_HASH,
    payload: { genesisHash, numberOfChunks }
  }),

  resetNode: ({ id, lastResetAt }) => ({
    type: NODE_RESET,
    payload: { id, lastResetAt }
  }),

  treasureHunt: ({
    genesisHash,
    sectorIndex,
    currentChunkIdx,
    numberOfChunks
  }) => ({
    type: NODE_TREASURE_HUNT,
    payload: { genesisHash, sectorIndex, currentChunkIdx, numberOfChunks }
  }),

  markSectorAsClaimedByOtherNode: ({ genesisHash, sectorIndex }) => ({
    type: NODE_MARK_SECTOR_AS_CLAIMED_BY_OTHER_NODE,
    payload: { genesisHash, sectorIndex }
  })
});

export default ACTIONS;
