import "rxjs";
import { combineEpics } from "redux-observable";
import appEpics from "./app-epics";
import nodeEpics from "./node-epics";

export default combineEpics(appEpics, nodeEpics);
