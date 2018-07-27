import consentActions from "../actions/consent-actions";
import { Reducer } from 'redux';
import { ConsentState, ConsentActions } from "../../types";
import { CONSENT_STATUS } from "../../config";

export const initState : ConsentState = {
  status: CONSENT_STATUS.PENDING
};

export const consentReducer: Reducer<ConsentState> = (state: ConsentState = initState, action) => {

  switch ((action as ConsentActions).type) {

    case consentActions.GIVE_CONSENT:
       return {
        ...state,
        status: CONSENT_STATUS.APPROVED
      }

    case consentActions.DENY_CONSENT:
      return {
        ...state,
        status: CONSENT_STATUS.DENIED
      };

    default:
      return state;
  }
};
