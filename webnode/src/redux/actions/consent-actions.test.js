import actions from "./consent-actions";

test("consent-action GIVE_CONSENT", () => {
  const expected = {
    type: actions.GIVE_CONSENT
  };
  expect(actions.giveConsent()).toEqual(expected);
});

test("consent-action DENY_CONSENT", () => {
  const expected = {
    type: actions.DENY_CONSENT
  };
  expect(actions.denyConsent()).toEqual(expected);
});
