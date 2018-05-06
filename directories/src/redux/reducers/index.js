import { combineReducers } from "redux";

import pow from "redux/reducers/pow-reducers";
import node from "redux/reducers/node-reducer";
import treasureHunt from "redux/reducers/treasure-hunt-reducer";
import test from "redux/reducers/test-reducer";

export default combineReducers({ pow, node, treasureHunt, test });
