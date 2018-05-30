import React from "react";
import Radium from "radium";
import color from "color";

import { ASSET_URL } from "../../../config";
import Logo from "../../../assets/images/oyster-logo-with-dot.svg";

const LogoGroup = () => (
  <div style={style.container}>
    <img src={ASSET_URL + Logo} style={style.logo} />
    <div style={style.text}>Oyster Protocol in use</div>
  </div>
);

const style = {
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
};

export default Radium(LogoGroup);
