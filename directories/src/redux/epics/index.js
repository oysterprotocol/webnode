import "rxjs";
import { combineEpics } from "redux-observable";
import appEpics from "./app-epics";
import nodeEpics from "./node-epics";
import treasuresEpics from "./treasures-epics";

export default combineEpics(appEpics, nodeEpics, treasuresEpics);
