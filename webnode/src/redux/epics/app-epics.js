import { combineEpics } from "redux-observable";
import moment from "moment";

import uuidv1 from "uuid/v1";
import nodeActions from "../actions/node-actions";
import consentActions from "../actions/consent-actions";
import { CONSENT_STATUS } from "../../config";

const startAppEpic = (action$, store) => {
  return action$
    .ofType(nodeActions.NODE_SET_OWNER_ETH_ADDRESS, consentActions.GIVE_CONSENT)
    .filter(() => {
      const { consent } = store.getState();
      return consent.status === CONSENT_STATUS.APPROVED;
    })
    .map(() => {
      const { node } = store.getState();
      const newWebnode =
        !!node.lastResetAt &&
        node.lastResetAt >
          moment()
            .subtract(14, "days")
            .valueOf();

      const id = uuidv1();
      const today = moment().valueOf();

      return newWebnode
        ? nodeActions.initialize()
        : nodeActions.resetNode({ id, lastResetAt: today });
    });
};

export default combineEpics(startAppEpic);
