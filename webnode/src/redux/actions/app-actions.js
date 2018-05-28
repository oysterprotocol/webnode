export const APP_START = "directories/app/start";

export const CONSENT_GIVEN = "consentGiven";

export const CONSENT_DENIED = "consentDenied";

const ACTIONS = Object.freeze({
  // actions
  APP_START,
  CONSENT_GIVEN,
  CONSENT_DENIED,

  // actionCreators
  startApp: ethAddress => ({
    type: APP_START,
    payload: ethAddress
  }),
  consentGiven: () => ({
    type: CONSENT_GIVEN
  }),
  consentDenied: () => ({
    type: CONSENT_DENIED
  })
});

export default ACTIONS;
