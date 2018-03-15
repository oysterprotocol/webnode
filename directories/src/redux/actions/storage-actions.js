import {
  STORAGE_BROKERNODE_ADD,
  STORAGE_WEBNODE_ADD,
  STORAGE_GENESISHASH_ADD,
  STORAGE_EXCHANGES_ADD,
  STORAGE_PEERID_CHANGE
} from "./action-types";

export const storageBrokerNodeAdd = item => ({
  type: STORAGE_BROKERNODE_ADD,
  payload: item
});

export const storageWebNodeAdd = item => ({
  type: STORAGE_WEBNODE_ADD,
  payload: item
});

export const storageGenesisHashAdd = item => ({
  type: STORAGE_GENESISHASH_ADD,
  payload: item
});

export const storageExchangesAdd = (transactionId, needRequested) => ({
  type: STORAGE_EXCHANGES_ADD,
  payload: {
    transactionId: transactionId,
    needRequested: needRequested
  }
});

export const storagePeerIdChange = item => ({
  type: STORAGE_PEERID_CHANGE,
  payload: item
});
