import { combineReducers } from 'redux';

import storage from 'redux/reducers/storage-reducers';
import peerStorage from 'redux/reducers/peer-storage-reducers';
import items from 'redux/reducers/items-reducers';

export default combineReducers({ storage, peerStorage, items });
