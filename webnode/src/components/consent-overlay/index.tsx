import React from "react";

import ButtonGroup from "./button-group";
import MiddleGroup from "./middle-group";
import LogoGroup from "./logo-group";
import WebFont from "webfontloader";
import styled from "styled-components";

WebFont.load({
  google: {
    families: ["Poppins:400,600", "sans-serif"]
  }
});

const Container = styled.div`
  align-items: center;
  height: 300px;
`;

const OuterContainer = styled(Container)`
  font-family: Poppins;
  overflow: hidden;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  background-color: #ffffff;
  @media (max-width: 1200px) {
    height: 200px;
  }
`;

const BlueBar = styled.div`
  top: 0;
  height: 6px;
  width: 100%;
  border-bottom: solid 6px #088ffc;
`;

const InnerContainer = styled(Container)`
  flex-direction: row;
  display: flex;
  justify-content: space-around;
  @media (max-width: 1200px) {
    flex-direction: column;
    height: 200px;
  }
`;

interface ConsentOverlayProps {
  giveConsent: () => any;
  denyConsent: () => any;
  status: string;
}

class ConsentOverlay extends React.Component<ConsentOverlayProps> {
  render() {
    const { denyConsent, giveConsent } = this.props;
    return (
      <OuterContainer>
        <BlueBar />
        <InnerContainer>
          <LogoGroup />
          <MiddleGroup />
          <ButtonGroup giveConsent={giveConsent} denyConsent={denyConsent} />
        </InnerContainer>
      </OuterContainer>
    );
  }
}

export default ConsentOverlay;
