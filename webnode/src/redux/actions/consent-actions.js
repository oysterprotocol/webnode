export const CONSENT_GIVEN = "directories/app/consent-given";
export const CONSENT_DENIED = "directories/app/consent-denied";

const ACTIONS = Object.freeze({
  // actions
  CONSENT_GIVEN,
  CONSENT_DENIED,

  // actionCreators
  consentGiven: () => ({
    type: CONSENT_GIVEN
  }),
  consentDenied: () => ({
    type: CONSENT_DENIED
  })
});

export default ACTIONS;
