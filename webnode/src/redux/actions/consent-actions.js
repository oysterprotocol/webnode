export const GIVE_CONSENT = "directories/app/give-consent";
export const DENY_CONSENT = "directories/app/deny-consent";

const ACTIONS = Object.freeze({
  // actions
  GIVE_CONSENT,
  DENY_CONSENT,

  // actionCreators
  giveConsent: () => ({
    type: GIVE_CONSENT
  }),
  denyConsent: () => ({
    type: DENY_CONSENT
  })
});

export default ACTIONS;
