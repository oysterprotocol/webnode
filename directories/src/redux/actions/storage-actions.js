import {
  STORAGE_BROKERNODE_ADD,
  STORAGE_WEBNODE_ADD,
  STORAGE_GENESISHASH_ADD,
  STORAGE_EXCHANGES_ADD,
  STORAGE_PEERID_CHANGE
} from './action-types';

export const storageBrokerNodeAdd = item => ({
  type: STORAGE_BROKERNODE_ADD,
  payload: item
});

export const storageWebNodeAdd = item => ({
  type: STORAGE_WEBNODE_ADD,
  payload: item
});

export const storageGenesisHashAdd = item  => ({
  type: STORAGE_GENESISHASH_ADD,
  payload: item
});

export const storageExchangesAdd = (transaction_id, need_requested) => ({
  type: STORAGE_EXCHANGES_ADD,
  transaction_id: transaction_id,
  need_requested: need_requested
});

export const storagePeerIdChange = item  => ({
  type: STORAGE_PEERID_CHANGE,
  payload: item
});
