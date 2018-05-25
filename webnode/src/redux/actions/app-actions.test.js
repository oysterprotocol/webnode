import actions from "./app-actions";

test("app-action APP_START", () => {
  const expected = {
    type: actions.APP_START
  };
  expect(actions.startApp()).toEqual(expected);
});
