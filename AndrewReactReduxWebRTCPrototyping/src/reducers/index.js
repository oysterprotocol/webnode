import { combineReducers } from 'redux';
import WebnodesReducer from './reducer_webnodes';
import NodeinfoReducer from './reducer_nodeinfo';

const rootReducer = combineReducers({
  webnode_addresses:  WebnodesReducer,
  nodeinfo: NodeinfoReducer
});

export default rootReducer;
