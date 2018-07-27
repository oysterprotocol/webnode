import { CONSENT_STATUS } from "../../config";
import consentActions from "../actions/consent-actions";
import consent from "./consent-reducer";

test("consent-reducer GIVE_CONSENT", () => {
  const state = {
    status: CONSENT_STATUS.PENDING
  };

  const action = {
    type: consentActions.GIVE_CONSENT
  };

  const expected = {
    status: CONSENT_STATUS.APPROVED
  };

  expect(consent(state, action)).toEqual(expected);
});

test("consent-reducer DENY_CONSENT", () => {
  const state = {
    status: CONSENT_STATUS.PENDING
  };

  const action = {
    type: consentActions.DENY_CONSENT
  };

  const expected = {
    status: CONSENT_STATUS.DENIED
  };

  expect(consent(state, action)).toEqual(expected);
});
