import * as React from "react";

import ButtonGroup from "./button-group";
import MiddleGroup from "./middle-group";
import LogoGroup from "./logo-group";
import * as WebFont from "webfontloader";
import Radium from 'radium';

WebFont.load({
  google: {
    families: ["Poppins:400,600", "sans-serif"]
  }
});

interface ConsentOverlayProps {
  giveConsent: () => any;
  denyConsent: () => any;
  status: string;
}

interface State {
}

class ConsentOverlay extends React.Component<ConsentOverlayProps, State> {
  render() {
    const { denyConsent, giveConsent } = this.props;
    const style = {
      ConsentOverlayStyle: {
        fontFamily: "Poppins",
        overflow: "hidden",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#ffffff",
        height: 300,
        "@media (max-width: 1200px)": {
          height: 200
        }
      },
      consentInner: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: 300,
        "@media (max-width: 1200px)": {
          flexDirection: "column",
          height: 200
        }
      },
      blueBar: {
        top: 0,
        height: 6,
        width: "100%",
        borderBottom: "solid 6px #088ffc"
      }
    };
    return (
      <Radium.StyleRoot>
        <div style={style.ConsentOverlayStyle}>
          <div style={style.blueBar} />
          <div style={style.consentInner}>
            <LogoGroup />
            <MiddleGroup />
            <ButtonGroup giveConsent={giveConsent} denyConsent={denyConsent} />
          </div>
        </div>
      </Radium.StyleRoot>
    );
  }
}

export default Radium(ConsentOverlay);

