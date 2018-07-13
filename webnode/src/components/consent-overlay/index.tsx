import * as React from "react";

import ButtonGroup from "./button-group";
import MiddleGroup from "./middle-group";
import LogoGroup from "./logo-group";
import * as Radium from "radium";
import * as WebFont from "webfontloader";
import StyledComponent, { InternalStyle } from "../styledComponent";

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

@Radium
class ConsentOverlay extends StyledComponent<ConsentOverlayProps, State> {
  render() {
    const { denyConsent, giveConsent } = this.props;
    const style = this.getStyle(ConsentOverlay.style);
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

  static style: InternalStyle = () => ({
    ConsentOverlayStyle: {
      fontFamily: "Poppins",
      overflow: "hidden",
      bottom: 0,
      left: 0,
      right: 0,
      position: "fixed",
      backgroundColor: "#ffffff",
      textAlign: "center",
      height: 300,
      "@media (max-width: 1200px)": {
        height: 200
      }
    },
    consentInner: {
      flexDirection: "row",
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
  });
}

export default ConsentOverlay;
