import React, { Component } from "react";
import { connect } from "react-redux";

import consentActions from "../../redux/actions/consent-actions";
import ConsentOverlay from "../consent-overlay";

import { CONSENT_STATUS } from "../../config";

class Footer extends Component {
  render() {
    const { status, giveConsent, denyConsent } = this.props;
    if (status === CONSENT_STATUS.APPROVED) {
      return null;
    }
    console.log("Xxxxxxxxxxxxxxx: ", status);

    return (
      <ConsentOverlay
        status={status}
        giveConsent={giveConsent}
        denyConsent={denyConsent}
      />
    );
  }
}

const mapStateToProps = state => ({
  status: state.consent.status
});

const mapDispatchToProps = dispatch => ({
  giveConsent: obj => dispatch(consentActions.giveConsent()),
  denyConsent: obj => dispatch(consentActions.denyConsent())
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
