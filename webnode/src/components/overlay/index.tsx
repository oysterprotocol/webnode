import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import nodeActions from "../../redux/actions/node-actions";
import consentActions from "../../redux/actions/consent-actions";
import ConsentOverlay from "../consent-overlay";

import { CONSENT_STATUS } from "../../config";
import { RootState } from "types";

interface OverlayProps {
  setOwnerEthAddress: (ethAddress: string) => any;
  giveConsent: () => any;
  denyConsent: () => any;
  ethAddress: string;
  status: string;
}

export class Overlay extends React.Component<OverlayProps> {
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

const mapStateToProps = (state: RootState) => ({
  status: state.consent.status
});

const mapDispatchToProps = (dispatch: Dispatch<OverlayProps>) =>
  bindActionCreators(
    {
      setOwnerEthAddress: (ethAddress: string) =>
        nodeActions.setOwnerEthAddress(ethAddress),
      giveConsent: consentActions.giveConsent,
      denyConsent: consentActions.denyConsent
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
