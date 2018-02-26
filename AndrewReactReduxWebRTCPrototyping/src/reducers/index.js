import { combineReducers } from 'redux';
import WebnodesReducer from './reducer_webnodes';
import NodeinfoReducer from './reducer_nodeinfo';
import SelectedWebnodeReducer from './reducer_active_webnode.js'
import TransactionsReducer from './reducer_transactions.js'

const rootReducer = combineReducers({
  webnode_addresses:  WebnodesReducer,
  nodeinfo: NodeinfoReducer,
  selected_webnode: SelectedWebnodeReducer,
  transactions: TransactionsReducer
});

export default rootReducer;
