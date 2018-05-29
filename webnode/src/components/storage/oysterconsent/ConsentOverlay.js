import React, { Component } from "react";

import ButtonGroup from "./ButtonGroup";
import MiddleGroup from "./MiddleGroup";
import LogoGroup from "./LogoGroup";
import { StyleRoot } from "radium";
import './fonts.css';


class ConsentOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = { genesisHash: "", numberOfChunks: 0, consent: props.consent };
  }

  blueBar() {
    return <div style={style.blueBar} />;
  }

  render() {
    return (
      <StyleRoot>
        <div
          style={
            this.props.consent === 0
              ? style.ConsentOverlayStyle
              : { display: "none" }
          }
        >
          {this.blueBar()}
          <div style={style.consentInner}>
            <LogoGroup />
            <MiddleGroup />
            <ButtonGroup />
          </div>
        </div>
      </StyleRoot>
    );
  }
}

const style = {
  ConsentOverlayStyle: {
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
};

export default ConsentOverlay;
