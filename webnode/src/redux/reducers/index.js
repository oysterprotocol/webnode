import { combineReducers } from "redux";

import pow from "./pow-reducers";
import node from "./node-reducer";
import treasureHunt from "./treasure-hunt-reducer";
import test from "./test-reducer";

export default combineReducers({ pow, node, treasureHunt, test });
