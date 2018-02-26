const STORAGE_BROKERNODE_ADD = 'directories/storage/brokernode/add';
const STORAGE_WEBNODE_ADD = 'directories/storage/webnode/add';
const STORAGE_GENESISHASH_ADD = 'directories/storage/genesishash/add';
const STORAGE_EXCHANGES_ADD = 'directories/storage/exchanges/add';
const STORAGE_PEERID_CHANGE = 'directories/storage/peerid/change';

const ACTIONS = Object.freeze({
  // actions
  STORAGE_BROKERNODE_ADD,
  STORAGE_WEBNODE_ADD,
  STORAGE_GENESISHASH_ADD,
  STORAGE_EXCHANGES_ADD,
  STORAGE_PEERID_CHANGE,

  // actionCreators
  storageBrokerNodeAddAction: (item) => ({
    type: ACTIONS.STORAGE_BROKERNODE_ADD,
    payload: item
  }),

  storageWebNodeAddAction: (item) => ({
    type: ACTIONS.STORAGE_WEBNODE_ADD,
    payload: item
  }),

  storageGenesisHashAddAction: (item) => ({
    type: ACTIONS.STORAGE_GENESISHASH_ADD,
    payload: item
  }),

  storageExchangesAddAction: (transaction_id, need_requested) => ({
    type: ACTIONS.STORAGE_EXCHANGES_ADD,
    transaction_id: transaction_id,
    need_requested: need_requested
  }),

  storagePeerIdChangeAction: (item) => ({
    type: ACTIONS.STORAGE_PEERID_CHANGE,
    payload: item
  })

});

export default ACTIONS;
