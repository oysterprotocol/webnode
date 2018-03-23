import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import moment from "moment";

import appActions from "../actions/app-actions";
import nodeActions from "../actions/node-actions";
import { peerInit } from "../api";

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
      const peer = peerInit();
      const today = new Date();
      return nodeActions.resetNode({ id: peer.id, lastResetAt: today });
    });
};

export default combineEpics(startAppEpic);
