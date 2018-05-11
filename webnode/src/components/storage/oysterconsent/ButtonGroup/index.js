import React from "react";
import Radium from "radium";
import color from "color";

const ButtonGroup = () => (
  <div style={styles.container}>
    <li>
      {" "}
      <Button kind="continue">Continue Ad-Free</Button>
    </li>
    <li>
      {" "}
      <Button kind="deny">Deny Consent</Button>
    </li>
  </div>
);

class Button extends React.Component {
  render() {
    return (
      <button style={[styles.base, styles[this.props.kind]]}>
        {this.props.children}
      </button>
    );
  }
}

Button = Radium(Button);

const styles = {
  base: {
    borderRadius: 12,
    padding: 0,
    fontFamily: "Poppins",
    fontSize: 23,
    fontWeight: 600,
    border: "none",
    width: 350,
    height: 50,
    margin: 15
  },

  continue: {
    background: "#088ffc",
    color: "#ffffff",
    ":hover": {
      background: color("#088ffc")
        .lighten(0.2)
        .hexString()
    }
  },

  deny: {
    background: "#ffffff",
    color: "#f76868",
    ":hover": {
      color: color("#f76868")
        .lighten(0.2)
        .hexString()
    }
  },
  container: {
    marginRight: 250,
    listStyleType: "none",
    display: "inline-block",
    verticalAlign: "middle",
    float: "right",
    position: "relative",
    top: "50%",
    transform: "translateY(35%)"
  }
};

export default ButtonGroup;
