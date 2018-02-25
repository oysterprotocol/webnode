import { combineReducers } from 'redux';
import WebnodesReducer from './reducer_webnodes';

const rootReducer = combineReducers({
  webnode_addresses:  WebnodesReducer
});

export default rootReducer;
