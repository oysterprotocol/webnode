import 'rxjs';
import { combineEpics } from 'redux-observable';
import peerEpics from './peer-epics';
import iotaEpics from './iota-epics';

export default combineEpics(
  peerEpics,
  iotaEpics
)
