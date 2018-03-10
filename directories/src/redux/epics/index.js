import 'rxjs';
import {combineEpics} from 'redux-observable';
import peerEpics from './peer-epics';
import iotaEpics from './iota-epics';
import powEpics from './pow-epics';

export default combineEpics(
    peerEpics,
    iotaEpics,
    powEpics
)
