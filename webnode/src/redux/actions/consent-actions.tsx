import { action } from 'typesafe-actions';

export const GIVE_CONSENT = "directories/app/give-consent";
export const DENY_CONSENT = "directories/app/deny-consent";

const ACTIONS = Object.freeze({
  // actions
  GIVE_CONSENT,
  DENY_CONSENT,
 
  // actionCreators
  giveConsent: () => action(GIVE_CONSENT),

  denyConsent: () => action(DENY_CONSENT)
});

export default ACTIONS;
