import consentActions from "../actions/consent-actions";

const CONSENT_STATUSES = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  DENIED: "DENIED"
};

const initState = {
  status: CONSENT_STATUSES.PENDING
};

export default (state = initState, action) => {
  switch (action.type) {
    case consentActions.CONSENT_GIVEN:
      return {
        ...state,
        status: CONSENT_STATUSES.APPROVED
      };
    case consentActions.CONSENT_DENIED:
      return {
        ...state,
        status: CONSENT_STATUSES.DENIED
      };

    default:
      return state;
  }
};
