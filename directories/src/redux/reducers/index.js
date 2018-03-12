import { combineReducers } from "redux";

import storage from "redux/reducers/storage-reducers";
import peer from "redux/reducers/peer-reducers";
import api from "redux/reducers/api-reducers";
import iota from "redux/reducers/iota-reducers";

export default combineReducers({ storage, peer, api, iota });
