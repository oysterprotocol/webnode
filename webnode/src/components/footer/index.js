import React, { Component } from "react";
import { connect } from "react-redux";

import consentActions from "../../redux/actions/consent-actions";
import ConsentOverlay from "../consent-overlay";

class Footer extends Component {
  render() {
    const { status } = this.props;
    return <ConsentOverlay status={status} />;
  }
}

const mapStateToProps = state => ({
  consent: state.consent.status
});

const mapDispatchToProps = dispatch => ({
  consentGiven: obj => dispatch(consentActions.consentGiven()),
  consentDenied: obj => dispatch(consentActions.consentDenied())
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
