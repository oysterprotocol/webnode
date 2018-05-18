export const DEVELOPED_MODE = true;
export const API_VERSION = "api/v2";
export const API_ROOT_URL =
  window.location.href.indexOf("localhost") > 0
    ? "http://localhost:3000"
    : "http://18.217.131.231:3000";
export const API_HEADERS = ["Content-type : application/json"];
export const API_REQUEST_ERROR = "API_REQUEST_ERROR";

export const API_URL_PEER_ID = "/givePeerId";
export const API_URL_START_TRANSACTION = "/startTransaction";
export const API_URL_SELECT_NEED = "/selectItem";
export const API_URL_CONFIRM_WORK = "/confirmWork";

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

export const MIN_BROKER_NODES = 2;
export const MIN_GENESIS_HASHES = 1;

export const SECTOR_STATUS = {
  CLAIMED: "CLAIMED",
  NOT_STARTED: "NOT_STARTED",
  SEARCHING: "SEARCHING",
  TREASURE_FOUND: "TREASURE_FOUND"
};

export const CHUNKS_PER_SECTOR = 1000000;

export const TEST_GENESIS_HASHES = [
  "dc948e9a95668139a41abe3b9ae07dc62736fa48493404b9f6a75402f6488ea5"
];
