import React, { Component } from "react";

import ButtonGroup from "./ButtonGroup";
import MiddleGroup from "./MiddleGroup";
import LogoGroup from "./LogoGroup";

class ConsentOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = { genesisHash: "", numberOfChunks: 0 };
  }

  blueBar() {
    return <div style={style.blueBar} />;
  }

  render() {
    return (
      <div style={style.ConsentOverlayStyle}>
        {this.blueBar()}
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: 300
          }}
        >
          <LogoGroup />
          <MiddleGroup />
          <ButtonGroup />
        </div>
      </div>
    );
  }
}

const style = {
  ConsentOverlayStyle: {
    bottom: 0,
    left: 0,
    right: 0,
    position: "fixed",
    backgroundColor: "#ffffff",
    textAlign: "center",
    height: 300
  },
  blueBar: {
    top: 0,
    height: 6,
    width: "100%",
    borderBottom: "solid 6px #088ffc"
  }
};

export default ConsentOverlay;
