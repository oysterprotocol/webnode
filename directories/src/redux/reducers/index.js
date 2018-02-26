import { combineReducers } from 'redux';

import storage from 'redux/reducers/storage-reducer';
import peer from 'redux/reducers/peer-reducer';

export default combineReducers({ storage, peer });
