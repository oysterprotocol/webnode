import { combineReducers } from 'redux';
import WebnodesReducer from './reducer_webnodes';
import NodeinfoReducer from './reducer_nodeinfo';
import SelectedWebnodeReducer from './reducer_active_webnode';
import TransactionsReducer from './reducer_transactions';
import StorageReducer from './storage-reducer';

const rootReducer = combineReducers({
  webnode_addresses:  WebnodesReducer,
  nodeinfo: NodeinfoReducer,
  selected_webnode: SelectedWebnodeReducer,
  transactions: TransactionsReducer,
  storage: StorageReducer

});

export default rootReducer;
