import { combineReducers } from "redux";

import storage from "redux/reducers/storage-reducers";
import peer from "redux/reducers/peer-reducers";
import items from "redux/reducers/items-reducers";
import iota from "redux/reducers/iota-reducers";
import pow from "redux/reducers/pow-reducers";
import node from "redux/reducers/node-reducer";

export default combineReducers({ storage, peer, items, iota, pow, node });
