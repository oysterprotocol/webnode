import 'rxjs';
import { combineEpics } from 'redux-observable';
import peerEpics from './peer-epics';

export default combineEpics(
  peerEpics
)
