import React, { Component } from "react";

import ButtonGroup from "./ButtonGroup";
import MiddleGroup from "./MiddleGroup";

import Logo from "../../../assets/images/logo.png";

class ConsentOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = { genesisHash: "", numberOfChunks: 0 };
  }

  render() {
    return (
      <div style={ConsentOverlayStyle}>
        <div style={{ padding: 15 }}>
          <img src={Logo} style={{ height: 50 }} />
          <MiddleGroup />
          <ButtonGroup />
        </div>
      </div>
    );
  }
}

const ConsentOverlayStyle = {
  bottom: 0,
  left: 0,
  right: 0,
  position: "fixed",
  backgroundColor: "#ffffff",
  textAlign: "center",
  height: 350
};

export default ConsentOverlay;
