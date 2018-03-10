import {Observable} from 'rxjs';
import {combineEpics} from 'redux-observable';
import {IOTA_POW} from '../actions/action-types';
import {fulfillPoW} from '../actions/pow-actions';
import {attachToTangleCurl} from '../../services/iota';

const powEpics = (action$, store) => {
    return action$.ofType(IOTA_POW).mergeMap(action => {
        const {data} = action.payload;
        return Observable
            .fromPromise(attachToTangleCurl(data))
            .map(powResults => {
                fulfillPoW({powResults})
            })
            .catch(error => Observable.empty())
    });
};

export default combineEpics(
    powEpics
);
