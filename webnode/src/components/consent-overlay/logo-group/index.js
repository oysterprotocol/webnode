import React from "react";
import styled from "styled-components";

import { ASSET_URL } from "../../../config";
import LogoImg from "../../../assets/images/oyster-logo-with-dot.svg";

const Container = styled.div`
  width: 20%;
  flex-direction: column;
  justify-content: space-around;
  @media (max-width: 1200px) {
    display: none;
  }
`;

const Logo = styled.img`
  height: 100;
`;

const Text = styled.div`
  font-family: Poppins;
  font-size: 32px;
  font-weight: 600;
  padding-top: 25px;
  line-height: 1.25;
  color: #088ffc;
`;

const LogoGroup = () => (
  <Container>
    <Logo src={`${ASSET_URL}${LogoImg}`} alt="logo" />
    <Text>Oyster Protocol in use</Text>
  </Container>
);

export default LogoGroup;
