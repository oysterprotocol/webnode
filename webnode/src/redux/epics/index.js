import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/catch";

import { combineEpics } from "redux-observable";
import appEpics from "./app-epics";
import nodeEpics from "./node-epics";
import treasureHuntEpics from "./treasure-hunt-epics";

export default combineEpics(appEpics, nodeEpics, treasureHuntEpics);
