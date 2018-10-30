import React from "react";
import styled from "styled-components";
import { Container, Flexbox, Button } from "../../generic";

const ContinueButton = styled(Button)`
  :hover: {
    background: #088ffc;
  }
`;

const DenyButton = styled(Button)`
  :hover: {
    background: #f76868;
    border-color: #f76868;
  }
`;

const DesktopContainer = styled(Container)`
  @media (max-width: 1200px) {
    display: none;
  }
`;

const MobileContainer = styled(Flexbox)`
  @media (min-width: 1201px) {
    display: none;
  }
`;

interface ButtonGroupProps {
  giveConsent: () => void;
  denyConsent: () => void;
}

class ButtonGroup extends React.Component<ButtonGroupProps> {
  render() {
    const { giveConsent, denyConsent } = this.props;
    return (
      <div>
        <DesktopContainer
          width="15%"
          minWidth="200px"
          listStyleType="none"
        >
          <li>
            {" "}
            <ContinueButton onClick={giveConsent}>
              Continue Ad-Free
            </ContinueButton>
          </li>
          <li>
            {" "}
            <DenyButton
              border="1px solid #f76868"
              color="#f76868"
              backgroundColor="#ffffff"
              onClick={denyConsent}
            >
              Deny Consent
            </DenyButton>
          </li>
        </DesktopContainer>
        <MobileContainer
          flex-direction="row"
          width="90%"
          minWidth="200px"
        >
          <ContinueButton onClick={giveConsent}>
            Continue Ad-Free
          </ContinueButton>
          <DenyButton
            color="#f76868"
            backgroundColor="#ffffff"
            onClick={denyConsent}
          >
            Deny Consent
          </DenyButton>
        </MobileContainer>
      </div>
    );
  }
}

export default ButtonGroup;
