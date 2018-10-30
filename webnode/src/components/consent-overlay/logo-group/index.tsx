import React from "react";
import styled from "styled-components";

import { ASSET_URL } from "../../../config";
import LogoImg from "../../../assets/images/oyster-logo-with-dot.svg";
import { Flexbox, Text, Image } from "../../generic";

const LogoGroupContainer = styled(Flexbox)`
  @media (max-width: 1200px) {
    display: none;
  }
`;

class LogoGroup extends React.Component {
  render() {
    return (
      <LogoGroupContainer
        width="20%"
        flexDirection="column"
        justifyContent="space-around"
      >
        <Image src={`${ASSET_URL}${LogoImg}`} alt="logo" />
        <Text
          color="#088ffc"
          lineHeight="1.25"
          paddingTop="25px"
          fontSize="32px"
          fontFamily="Poppins"
        >
          Oyster Protocol in use
        </Text>
      </LogoGroupContainer>
    );
  }
}

export default LogoGroup;
