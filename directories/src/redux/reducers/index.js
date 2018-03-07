import { combineReducers } from 'redux';

import storage from 'redux/reducers/storage-reducers';
import peer from 'redux/reducers/peer-reducers';
import items from 'redux/reducers/items-reducers';

export default combineReducers({ storage, peer, items });
