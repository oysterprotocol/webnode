import { combineReducers } from "redux";

import pow from "redux/reducers/pow-reducers";
import node from "redux/reducers/node-reducer";

export default combineReducers({ pow, node });
