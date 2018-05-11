import React from "react";
import Radium from "radium";
import color from "color";

import Logo from "../../../../assets/images/logo.png";

const LogoGroup = () => (
  <div style={style.container}>
    <img src={Logo} style={{ height: 120 }} />
    <div style={style.text}>Oyster Protocol in use</div>
  </div>
);

const style = {
  container: {
    width: 400,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 32,
    fontWeight: 600,
    paddingTop: 25,
    color: "#088ffc"
  }
};

export default LogoGroup;
