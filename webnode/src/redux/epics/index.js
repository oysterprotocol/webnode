import "rxjs";
import { combineEpics } from "redux-observable";
import appEpics from "./app-epics";
import nodeEpics from "./node-epics";
import treasureHuntEpics from "./treasure-hunt-epics";

export default combineEpics(appEpics, nodeEpics, treasureHuntEpics);
