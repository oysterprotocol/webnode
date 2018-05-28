import actions from "./app-actions";

test("app-action APP_START", () => {
  const expected = {
    type: actions.APP_START,
    payload: "0x123"
  };
  expect(actions.startApp("0x123")).toEqual(expected);
});
