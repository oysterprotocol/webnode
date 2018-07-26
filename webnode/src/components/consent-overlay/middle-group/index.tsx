import * as React from "react";
import Radium from 'radium';


class MiddleGroup extends React.Component {
  render() {
    const style = {
      container: {
        width: "45%",
        "@media (max-width: 1200px)": {
          width: "90%"
        }
      },
      textDesktop: {
        color: "#778291",
        fontSize: 16,
        fontFamily: "Open Sans",
        lineHeight: 1.5,
        "@media (max-width: 1200px)": {
          display: "none"
        }
      },
      textMobile: {
        color: "#778291",
        fontSize: 12,
        fontFamily: "Open Sans",
        lineHeight: 1.5,
        "@media (min-width: 1201px)": {
          display: "none"
        }
      },
      headline: {
        fontSize: 18,
        fontFamily: "Poppins",
        fontWeight: 600,
        color: "#088ffc",
        paddingBottom: 10,
        "@media (max-width: 1200px)": {
          fontSize: 12
        }
      },
      link: {
        color: "#778291",
        fontWeight: 600,
      }
    };
    return (
      <div style={style.container}>
        <div style={style.headline}>Consent to an Ad-Free Experience</div>
        <div style={style.textDesktop}>
          This website is revolutionizing the way content is monetized on the
          internet. We use the Oyster Protocol as a way to generate revenue, whilst
          you can experience our site ad-free. By consenting, you agree to exchange
          a fraction of CPU and GPU power. This amounts much less than if we served
          Ads on our site. If you choose to continue, we'll assume that you are
          happy to receive the Oyster Protocol on our website. The Oyster Protocol
          does not share the data it collects about you with advertisers, and will
          stop using resources after you leave this site. IF you choose to deny
          consent for the Oyster Protocol's use, the website owner may block you
          from viewing certain content. <b><a style={style.link}  target="_blank"  rel="noopener noreferrer" href="http://oysterprotocol.com">Learn more...</a></b>
        </div>
        <div style={style.textMobile}>
          This website is using the Oyster protocol to generate revenue. By using a
          small portion of your unused device resources, this website generates
          revenue without the use of intrusive ads. Choosing to deny consent may
          result in the web owner blocking certain content from view. <a style={style.link} target="_blank" rel="noopener noreferrer" href="http://oysterprotocol.com">Learn more...</a>
        </div>
      </div>
    );
  }
}

export default Radium(MiddleGroup);
