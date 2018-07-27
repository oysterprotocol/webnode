import { combineReducers } from "redux";

import { powReducer } from "./pow-reducer";
import { consentReducer } from "./consent-reducer";
import { nodeReducer }  from "./node-reducer";
import { treasureHuntReducer }  from "./treasure-hunt-reducer";
import { testReducer }  from "./test-reducer";

const reducers = combineReducers({
  pow: powReducer,
  consent: consentReducer,
  node: nodeReducer,
  treasureHunt: treasureHuntReducer,
  test: testReducer
});

export default reducers;
