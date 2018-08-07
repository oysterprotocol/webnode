import consentActions from "../actions/consent-actions";
import { CONSENT_STATUS } from "../../config";

const initState = {
  status: CONSENT_STATUS.PENDING
};

const consentReducer = (state = initState, action) => {
  switch (action.type) {
    case consentActions.GIVE_CONSENT:
      return {
        ...state,
        status: CONSENT_STATUS.APPROVED
      };
    case consentActions.DENY_CONSENT:
      return {
        ...state,
        status: CONSENT_STATUS.DENIED
      };

    default:
      return state;
  }
};
export default consentReducer;
