export const DEVELOPED_MODE = true;
export const API_VERSION = "api/v2";
export const API_ROOT_URL =
  window.location.href.indexOf("localhost") > 0
    ? "http://localhost:3000"
    : "https://broker-1.oysternodes.com:3000";

export const ASSET_URL =
  window.location.href.indexOf("localhost") > 0
    ? window.location.href
    : "https://web.oysternode.com/";

export const IOTA_API_PROVIDER = "http://18.188.64.13:14265";
export const IOTA_ADDRESS_LENGTH = 81;

export const MIN_BROKER_NODES = 1;
export const MIN_GENESIS_HASHES = 1;

export const SECTOR_STATUS = {
  CLAIMED: "CLAIMED",
  UNCLAIMED: "UNCLAIMED"
};

export const CONSENT_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  DENIED: "DENIED"
};

export const CHUNKS_PER_SECTOR = 1000000;

export const TEST_GENESIS_HASHES = [
  "ef1b4554b887d814097ad7f7d628071497e2b092dc9e7a92b92fc8556bce3aee"
];

export const TEST_ETH_ADDRESS = "0xD1833A50f411432aD38E8374df8Cfff79e743788";
