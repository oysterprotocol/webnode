import storageActions from 'redux/actions/storage-actions';
import { DEFAULT_CONSTANT } from 'config';

const initState = {
  peerId: DEFAULT_CONSTANT.PEER_ID,
  brokerNode: DEFAULT_CONSTANT.BROKER_NODE,
  webNode: DEFAULT_CONSTANT.WEB_NODE,
  genesisHash: DEFAULT_CONSTANT.GENESIS_HASH,
  exchanges: [{
    transaction_id: DEFAULT_CONSTANT.EXCHANGES_TRANSACTION_ID,
    need_requested: DEFAULT_CONSTANT.EXCHANGES_NEED_REQUESTED
  }]
};

const storageReducer = (state = initState, action) => {
  switch (action.type) {

    case storageActions.STORAGE_BROKERNODE_ADD:
      return {
        ...state,
        brokerNode: [
          ...state.brokerNode, action.payload
        ]
      };

    case storageActions.STORAGE_WEBNODE_ADD:
      return {
        ...state,
        webNode: [
          ...state.webNode, action.payload
        ]
      };

    case storageActions.STORAGE_GENESISHASH_ADD:
      return {
        ...state,
        genesisHash: [
          ...state.genesisHash, action.payload
        ]
      };

    case storageActions.STORAGE_EXCHANGES_ADD:
      return {
        ...state,
        exchanges: [
          ...state.exchanges, { transaction_id: action.transaction_id, need_requested: action.need_requested}
        ]
      };

    case storageActions.STORAGE_PEERID_CHANGE:
      return {
        ...state,
        peerId: action.payload
      };

    default:
      return state;
  }
};

export default storageReducer;
