import { IOTA_POW, IOTA_POW_SUCCESS } from "../actions/pow-actions";

import nodeActions from "../actions/node-actions";
import pow from "./pow-reducer";

test("pow-reducer NODE_REQUEST_BROKER_NODES", () => {
  const state = {
    powResults: [],
    statuses: ["Initializing"]
  };

  const action = {
    type: nodeActions.NODE_REQUEST_BROKER_NODES
  };

  const expected = {
    powResults: [],
    statuses: ["Initializing", "Doing proof of work"]
  };

  expect(pow(state, action)).toEqual(expected);
});

test("pow-reducer NODE_ADD_BROKER_NODE", () => {
  const state = {
    powResults: [],
    statuses: ["Initializing", "Doing proof of work"]
  };

  const action = {
    type: nodeActions.NODE_ADD_BROKER_NODE
  };

  const expected = {
    powResults: [],
    statuses: ["Initializing", "Doing proof of work", "Complete"]
  };

  expect(pow(state, action)).toEqual(expected);
});
