import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button, Container, Header, Image } from "semantic-ui-react";
import _ from "lodash";

import appActions from "../../redux/actions/app-actions";
import nodeActions from "../../redux/actions/node-actions";
import treasureHuntActions from "../../redux/actions/treasure-hunt-actions";

import iota from "../../redux/services/iota";
import datamap from "../../utils/datamap";

import TreasureTable from "./toolbox/TreasureTable";

import LOGO from "../../assets/images/logo.svg";

const GenesisHashInput = onChange => (
  <Input
    style={{ width: 1000, paddingBottom: 20 }}
    onChange={onChange}
    label={{ tag: true, content: "Genesis Hash" }}
    labelPosition="right"
    placeholder=""
  />
);

const NumberofChunksInput = onChange => (
  <Input
    onChange={onChange}
    style={{ paddingRight: 50, paddingBottom: 50 }}
    label={{ tag: true, content: "Number of Chunks" }}
    labelPosition="right"
    placeholder=""
  />
);

class Storage extends Component {
  constructor(props) {
    super(props);
    this.state = { genesisHash: "", numberOfChunks: 0 };
  }

  onGenesisHashChange = (e, data) => {
    this.setState({ genesisHash: data.value });
  };

  onNumberOfChunksChange = (e, data) => {
    this.setState({ numberOfChunks: parseInt(data.value) });
  };

  renderProgress(current, max) {
    if (current > -1) {
      return (
        <div>
          {current}/{max}
        </div>
      );
    } else {
      return null;
    }
  }

  async onClick() {
    const { startAppFn, startNode, findTreasure } = this.props;

    const generatedMap = datamap.generate(
      this.state.genesisHash,
      this.state.numberOfChunks
    );

    const transformedMap = _.toArray(generatedMap)
      .map((value, index) => ({
        address: value,
        chunkIdx: index
      }))
      .map(obj => findTreasure(obj));

    Promise.all(transformedMap); //TODO better implementation
  }

  render() {
    const { statuses, treasures, numberOfCalls } = this.props;
    return (
      <Container style={{ backgroundColor: "#0267ea" }}>
        <div style={{ padding: 50 }}>
          <Header as="h1" style={{ color: "#ffffff" }}>
            <Image src={LOGO} /> Oyster Toolbox{" "}
            {this.renderProgress(numberOfCalls, this.state.numberOfChunks)}
          </Header>{" "}
          <div style={{ paddingTop: 50 }}>
            {" "}
            {GenesisHashInput(this.onGenesisHashChange)}
            {NumberofChunksInput(this.onNumberOfChunksChange)}
            <Button onClick={() => this.onClick()}>Look for treasures</Button>
          </div>
          {treasures.length != 0 ? TreasureTable(treasures) : null}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  statuses: state.pow.statuses,
  treasures: state.test.treasures,
  numberOfCalls: state.test.numberOfCalls //TODO remove for production
});

const mapDispatchToProps = dispatch => ({
  startAppFn: () => dispatch(appActions.startApp()),
  findTreasure: obj => dispatch(treasureHuntActions.findTreasure(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(Storage);
