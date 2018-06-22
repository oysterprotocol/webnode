import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toArray";

import consentActions from "../actions/consent-actions";
import nodeActions from "../actions/node-actions";
import appEpic from "./app-epics";
import { CONSENT_STATUS } from "../../config";

import subDays from "date-fns/sub_days";
import uuidv1 from "uuid/v1";

import { ActionsObservable } from "redux-observable";
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore([]);

test("startAppEpic initialize", () => {
  const state = {
    consent: { status: CONSENT_STATUS.APPROVED },
    node: { lastResetAt: subDays(new Date(), 14).valueOf() + 1 }
  };

  const store = mockStore(state);

  const action = ActionsObservable.of(
    { type: nodeActions.NODE_SET_OWNER_ETH_ADDRESS }
  );

  appEpic(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).not.toEqual([nodeActions.initialize()]);
    });
});

test("startAppEpic resetNode", () => {
  const state = {
    consent: { status: CONSENT_STATUS.APPROVED },
    node: { lastResetAt: subDays(new Date(), 14).valueOf() - 1 }
  };

  const store = mockStore(state);

  const action = ActionsObservable.of(
    { type: consentActions.GIVE_CONSENT }
  );

  appEpic(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).not.toEqual([
        nodeActions.resetNode({
          id: uuidv1(),
          lastResetAt: new Date().valueOf()
        })
      ]);
    });
});
