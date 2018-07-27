import actions from "./pow-actions";

test("pow-action IOTA_POW", () => {
  const branchTransaction = "address";
  const broadcastingNodes = ["node", "testnode"];
  const mwm = 9;
  const trunkTransaction = "trunk";
  const trytes = ["tryte", "tryte"];
  const expected = {
    type: actions.IOTA_POW,
    payload: {
      branchTransaction: branchTransaction,
      broadcastingNodes: broadcastingNodes,
      mwm: mwm,
      trunkTransaction: trunkTransaction,
      trytes: trytes
    }
  };
  expect(
    actions.requestPoW({
      branchTransaction,
      broadcastingNodes,
      mwm,
      trunkTransaction,
      trytes
    })
  ).toEqual(expected);
});

test("pow-action IOTA_POW_SUCCESS", () => {
  const arrayOfTrytes = ["tryte", "tryte"];
  const broadcastingNodes = ["node", "testnode"];
  const expected = {
    type: actions.IOTA_POW_SUCCESS,
    payload: {
      arrayOfTrytes: arrayOfTrytes,
      broadcastingNodes: broadcastingNodes
    }
  };
  expect(
    actions.requestPoWSuccess({ arrayOfTrytes, broadcastingNodes })
  ).toEqual(expected);
});

test("pow-action IOTA_COMPLETE", () => {
  const expected = {
    type: actions.IOTA_COMPLETE
  };
  expect(actions.powComplete()).toEqual(expected);
});
