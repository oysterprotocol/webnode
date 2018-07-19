import * as React from "react";
import * as Radium from "radium";
import StyledComponent, { InternalStyle } from "../../styledComponent";
import Logo from "../../../assets/images/oyster-logo-with-dot.svg";

import { ASSET_URL } from "../../../config";


interface LogoGroupProps {
}

interface State {
}

@Radium
class LogoGroup extends StyledComponent<LogoGroupProps, State> {
  render() {
    const style = this.getStyle(LogoGroup.style);
    return (
      <div style={style.container}>
        <img src={ASSET_URL + Logo} style={style.logo} alt="logo"/>
        <div style={style.text}>Oyster Protocol in use</div>
      </div>
    );
  }

  static style: InternalStyle = () => ({
    container: {
    width: "20%",
      flexDirection: "column",
      justifyContent: "space-around",
      "@media (max-width: 1200px)": {
        display: "none"
      }
    },
    text: {
      fontFamily: "Poppins",
      fontSize: 32,
      fontWeight: 600,
      paddingTop: 25,
      lineHeight: 1.25,
      color: "#088ffc"
    },
    logo: {
      height: 100
    }
  });
}

export default LogoGroup;
