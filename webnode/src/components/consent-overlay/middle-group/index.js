import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 45%;
  @media (max-width: 1200px) {
    width: 90%;
  }
`;

const Headline = styled.div`
  font: 600 18px Poppins;
  color: #088ffc;
  text-align: left;
  padding-bottom: 10px;
  @media (max-width: 1200px) {
    font-size: 12px;
  }
`;

const Link = styled.a`
  color: #778291;
  font-weight: 600;
`;

const DesktopText = styled.div`
  color: #778291;
  font-size: 16px;
  font-family: Open Sans;
  text-align: justify;
  line-height: 1.5;
  @media (max-width: 1200px) {
    display: none;
  }
`;

const MobileText = styled.div`
  color: #778291;
  font-size: 12px;
  font-family: Open Sans;
  text-align: justify;
  line-height: 1.5;
  @media (min-width: 1201px) {
    display: none;
  }
`;

const MiddleGroup = () => (
  <Container>
    <Headline>Consent to an Ad-Free Experience</Headline>
    <DesktopText>
      This website is revolutionizing the way content is monetized on the
      internet. We use the Oyster Protocol as a way to generate revenue, whilst
      you can experience our site ad-free. By consenting, you agree to exchange
      a fraction of CPU and GPU power. This amounts much less than if we served
      Ads on our site. If you choose to continue, we'll assume that you are
      happy to receive the Oyster Protocol on our website. The Oyster Protocol
      does not share the data it collects about you with advertisers, and will
      stop using resources after you leave this site. IF you choose to deny
      consent for the Oyster Protocol's use, the website owner may block you
      from viewing certain content.{" "}
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
    <MobileText>
      This website is using the Oyster protocol to generate revenue. By using a
      small portion of your unused device resources, this website generates
      revenue without the use of intrusive ads. Choosing to deny consent may
      result in the web owner blocking certain content from view.{" "}
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="http://oysterprotocol.com"
      >
        Learn more...
      </Link>
    </MobileText>
  </Container>
);

export default MiddleGroup;
