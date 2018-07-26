import * as React from "react";
import Logo from "../../../assets/images/oyster-logo-with-dot.svg";
import Radium from 'radium';
import { ASSET_URL } from "../../../config";

class LogoGroup extends React.Component {
  render() {
    const style = {
      container: {
        width: "20%",
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
    };
    return (
      <div style={style.container}>
        <img src={ASSET_URL + Logo} style={style.logo} alt="logo"/>
        <div style={style.text}>Oyster Protocol in use</div>
      </div>
    );
  }
}

export default Radium(LogoGroup);
