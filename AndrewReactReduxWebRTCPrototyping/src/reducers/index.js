import { combineReducers } from 'redux';
import WebnodesReducer from './reducer_webnodes';
import NodeinfoReducer from './reducer_nodeinfo';
import SelectedWebnodeReducer from './reducer_active_webnode.js'

const rootReducer = combineReducers({
  webnode_addresses:  WebnodesReducer,
  nodeinfo: NodeinfoReducer,
  selected_webnode: SelectedWebnodeReducer
});

export default rootReducer;
