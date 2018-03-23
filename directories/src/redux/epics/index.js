import "rxjs";
import { combineEpics } from "redux-observable";
import appEpics from "./app-epics";
import peerEpics from "./peer-epics";
import nodeEpics from "./node-epics";
import iotaEpics from "./iota-epics";
import powEpics from "./pow-epics";
import itemsEpic from "./items-epics";

export default combineEpics(
  appEpics,
  peerEpics,
  itemsEpic,
  nodeEpics,
  iotaEpics,
  powEpics
);
