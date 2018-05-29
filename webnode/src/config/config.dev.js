export const DEVELOPED_MODE = true;
export const API_VERSION = "api/v2";

export const PEER_HOST = "localhost";
export const PEER_PORT = 8000;
export const PEER_PATH = "/peer";
export const PEER_DEBUG = 3;

export const IOTA_API_PROVIDER = "http://18.188.64.13:14265";
export const IOTA_ADDRESS_LENGTH = 81;

export const DEFAULT_CONSTANT = Object.freeze({
  PEER_ID: "",
  BROKER_NODE: ["127.0.0.1"],
  WEB_NODE: [],
  GENESIS_HASH: [],
  EXCHANGES_TRANSACTION_ID: "",
  EXCHANGES_NEED_REQUESTED: ""
});

export const MIN_BROKER_NODES = 1;
export const MIN_GENESIS_HASHES = 1;

export const SECTOR_STATUS = {
  CLAIMED: "CLAIMED",
  UNCLAIMED: "UNCLAIMED",
  SEARCHING: "SEARCHING",
  NOT_STARTED: "NOT_STARTED",
  TREASURE_FOUND: "TREASURE_FOUND"
};

export const CHUNKS_PER_SECTOR = 1000000;

export const TEST_GENESIS_HASHES = [
  "ef1b4554b887d814097ad7f7d628071497e2b092dc9e7a92b92fc8556bce3aee"
];