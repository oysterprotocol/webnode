import { ActionCreator } from "redux";
import { GiveConsentAction, DenyConsentAction } from "../../types";

export const GIVE_CONSENT = "directories/app/give-consent";
export const DENY_CONSENT = "directories/app/deny-consent";

export const giveConsent: ActionCreator<GiveConsentAction> = () => ({
  type: GIVE_CONSENT
});

export const denyConsent: ActionCreator<DenyConsentAction> = () => ({
  type: DENY_CONSENT
});

const ACTIONS = Object.freeze({
  // actions
  GIVE_CONSENT,
  DENY_CONSENT,
 
  // actionCreators
  giveConsent,
  denyConsent
});

export default ACTIONS;
