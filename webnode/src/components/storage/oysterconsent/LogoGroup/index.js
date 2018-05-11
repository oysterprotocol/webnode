import React from "react";
import Radium from "radium";
import color from "color";

import Logo from "../../../../assets/images/logo.png";

const LogoGroup = () => (
  <div style={styles.container}>
    <img src={Logo} style={{ height: 100 }} />
  </div>
);

const styles = {
  container: {
    width: 400
  }
};

export default LogoGroup;
