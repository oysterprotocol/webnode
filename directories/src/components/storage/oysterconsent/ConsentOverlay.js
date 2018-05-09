import React, { Component } from "react";

import ButtonGroup from "./ButtonGroup";

class ConsentOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = { genesisHash: "", numberOfChunks: 0 };
  }

  render() {
    return (
      <div style={ConsentOverlayStyle}>
        <div style={{ padding: 15 }}>
          <h2>Consent Overlay!</h2> <ButtonGroup />
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
  height: 200
};

export default ConsentOverlay;
