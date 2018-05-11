import React from "react";
import Radium from "radium";
import color from "color";

const MiddleGroup = () => (
  <div style={styles.container}>
    <div style={styles.headline}>Consent to an Ad-Free Experience</div>
    <div style={styles.text}>
      This website is revolutionizing the way content is monetized on the
      internet. We use the Oyster Protocol as a way to generate revenue, whilst
      you can experience our site ad-free. By consenting, you agree to exchange
      a fraction of CPU and CPU power. This amounts much less than if we served
      Ads on our site. If you choose to continue, we'll assume that you are
      happy to receive the Oyster Protocol on our website. The Oyster Protocol
      does not share the data it collects about you with advertisers, and will
      stop using resources after you leave this site. IF you choose to deny
      consent for the Oyster Protocol's use, the website owner may block you
      from viewing certain content.
    </div>
  </div>
);

const styles = {
  container: {
    width: 1100
  },
  text: {
    color: "#778291",
    fontSize: 16,
    fontFamily: "Open Sans",
    textAlign: "justify",
    lineHeight: 1.5
  },
  headline: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: 600,
    color: "#088ffc",
    textAlign: "left",
    paddingBottom: 10
  }
};

export default MiddleGroup;
