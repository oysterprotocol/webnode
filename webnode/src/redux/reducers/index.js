import { combineReducers } from "redux";

import pow from "./pow-reducer";
import consent from "./consent-reducer";
import node from "./node-reducer";
import treasureHunt from "./treasure-hunt-reducer";
import test from "./test-reducer";

export default combineReducers({ consent, pow, node, treasureHunt, test });
