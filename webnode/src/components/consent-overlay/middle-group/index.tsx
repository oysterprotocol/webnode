import React from "react";
import styled from "styled-components";
import { Container, Text, Link } from "../../generic";

const MiddleGroupContainer = styled(Container)`
  @media (max-width: 1200px) {
    width: 90%;
  }
`;

const Headline = styled(Text)`
  @media (max-width: 1200px) {
    font-size: 12px;
  }
`;

const DesktopText = styled(Text)`
  @media (max-width: 1200px) {
    display: none;
  }
`;

const MobileText = styled(Text)`
  @media (min-width: 1201px) {
    display: none;
  }
`;

class MiddleGroup extends React.Component {
  render() {
    return (
      <MiddleGroupContainer width="45%">
        <Headline
          color="#088ffc" 
          textAlign="left" 
          fontFamily="Poppins" 
          fontSize="18px"
          paddingBottom="10px"
        >
            Consent to an Ad-Free Experience
        </Headline>
        <DesktopText>
          This website is revolutionizing the way content is monetized on the
          internet. We use the Oyster Protocol as a way to generate revenue,
          whilst you can experience our site ad-free. By consenting, you agree
          to exchange a fraction of CPU and GPU power. This amounts much less
          than if we served Ads on our site. If you choose to continue, we'll
          assume that you are happy to receive the Oyster Protocol on our
          website. The Oyster Protocol does not share the data it collects about
          you with advertisers, and will stop using resources after you leave
          this site. IF you choose to deny consent for the Oyster Protocol's
          use, the website owner may block you from viewing certain content.{" "}
          <b>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="http://oysterprotocol.com"
            >
              Learn more...
            </Link>
          </b>
        </DesktopText>
        <MobileText fontSize="12px">
          This website is using the Oyster protocol to generate revenue. By
          using a small portion of your unused device resources, this website
          generates revenue without the use of intrusive ads. Choosing to deny
          consent may result in the web owner blocking certain content from
          view.{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="http://oysterprotocol.com"
          >
            Learn more...
          </Link>
        </MobileText>
      </MiddleGroupContainer>
    );
  }
}

export default MiddleGroup;
