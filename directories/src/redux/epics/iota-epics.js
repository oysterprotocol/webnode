import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { IOTA_PREPARE_TRANSFERS } from '../actions/action-types';
import { fullfillPrepareTranfers } from '../actions/iota-actions';

import IOTA from "iota.lib.js";
import { IOTA_API_PROVIDER } from "../../config";

const providerIota = new IOTA({
  provider: IOTA_API_PROVIDER
});

const prepareTransfersEpics = (action$, store) => {
  return action$.ofType(IOTA_PREPARE_TRANSFERS).mergeMap(action => {
    const { data } = action.payload;
    return Observable.fromPromise(
      new Promise((resolve, reject) => {
        providerIota.api.prepareTransfers(
          data.seed,
          [{
            'address': data.address,
            'value': data.value,
            'message': data.message,
            'tag': data.tag
          }],
          (error, prepareTransfers) => {
            if(error) {
              console.log("IOTA ERROR: ", error);
            } else {
              resolve(prepareTransfers);
            }
          }
        )
      })
    ).map(prepareTransfers =>
      fullfillPrepareTranfers({ prepareTransfers })
    ).catch(error => Observable.empty())
  });
};

export default combineEpics(
  prepareTransfersEpics
);
