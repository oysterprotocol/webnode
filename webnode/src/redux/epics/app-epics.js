import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import moment from "moment";

import appActions from "../actions/app-actions";
import nodeActions from "../actions/node-actions";
import peer from "../services/peer";

const startAppEpic = (action$, store) => {
  return action$
    .ofType(appActions.APP_START)
    .filter(() => {
      const { node } = store.getState();
      return (
        !!node.lastResetAt &&
        node.lastResetAt >
          moment()
            .subtract(14, "days")
            .valueOf()
      );
    })
    .map(() => {
      const p = peer.init();
      const today = new Date();
      return nodeActions.resetNode({ id: p.id, lastResetAt: today });
    });
};

export default combineEpics(startAppEpic);
