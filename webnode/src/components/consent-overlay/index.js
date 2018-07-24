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
  font-family: Poppins;
  overflow: hidden;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  background-color: #ffffff;
  text-align: center;
  height: 300px;
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

const Inner = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 300px;
  @media (max-width: 1200px) {
    flex-direction: column;
    height: 200px;
  }
`;

const ConsentOverlay = ({ giveConsent, denyConsent }) => {
  return (
    <Container>
      <BlueBar />
      <Inner>
        <LogoGroup />
        <MiddleGroup />
        <ButtonGroup giveConsent={giveConsent} denyConsent={denyConsent} />
      </Inner>
    </Container>
  );
};

export default ConsentOverlay;
