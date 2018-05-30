import React, { Component } from "react";
import { connect } from "react-redux";

import nodeActions from "../../redux/actions/node-actions";
import consentActions from "../../redux/actions/consent-actions";
import ConsentOverlay from "../consent-overlay";

import { CONSENT_STATUS } from "../../config";

class Footer extends Component {
  componentDidMount() {
    const { setOwnerEthAddress, ethAddress } = this.props;
    setOwnerEthAddress(ethAddress);
  }

  render() {
    const { status, giveConsent, denyConsent } = this.props;
    if (status !== CONSENT_STATUS.PENDING) {
      return null;
    }

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
  setOwnerEthAddress: ethAddress =>
    dispatch(nodeActions.setOwnerEthAddress(ethAddress)),
  giveConsent: obj => dispatch(consentActions.giveConsent()),
  denyConsent: obj => dispatch(consentActions.denyConsent())
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
