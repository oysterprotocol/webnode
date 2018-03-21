import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import moment from "moment";

import { APP_START } from "../actions/action-types";
import { resetNode } from "../actions/node-actions";
import { peerInit } from "../api";

const startAppEpic = (action$, store) => {
  return action$
    .ofType(APP_START)
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
      return resetNode({ id: peer.id, lastResetAt: today });
    });
};

export default combineEpics(startAppEpic);
