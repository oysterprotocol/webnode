import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button, Container, Header, Image } from "semantic-ui-react";
import { IS_DEV, CONSENT_STATUS } from "../../config";

import treasureHuntActions from "../../redux/actions/treasure-hunt-actions";
import nodeActions from "../../redux/actions/node-actions";
import consentActions from "../../redux/actions/consent-actions";

import Datamap from "datamap-generator";

import { TEST_ETH_ADDRESS } from "../../config";

import TreasureTable from "./toolbox/TreasureTable";
import ConsentOverlay from "../consent-overlay";

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
    this.state = {
      genesisHash: "",
      numberOfChunks: 0,
      stressCount: 2
    };
  }

  onGenesisHashChange = (e, data) => {
    this.setState({ genesisHash: data.value });
  };

  onNumberOfChunksChange = (e, data) => {
    this.setState({ numberOfChunks: parseInt(data.value, 10) });
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

  increment() {
    const { stressCount } = this.state;
    this.setState({ stressCount: stressCount + 1 });
  }

  decrement() {
    const { stressCount } = this.state;
    this.setState({ stressCount: stressCount - 1 });
    if (stressCount - 1 <= 0) {
      this.setState({ stressCount: 1 });
    }
  }

  start() {
    let { stressCount, ticks } = this.state;
    if (stressCount > 0) {
      this.intervalStress = setInterval(() => {
        this.onClick();
      }, stressCount);
    }
  }

  stop() {
    clearInterval(this.intervalStress);
  }

  async onClick() {
    const { findTreasure } = this.props;
    const generatedMap = Datamap.rawGenerate(
      this.state.genesisHash,
      this.state.numberOfChunks
    );

    const transformedMap = Object.values(generatedMap)
      .map((value, index) => ({
        dataMapHash: value,
        chunkIdx: index
      }))
      .map(obj => findTreasure(obj));

    Promise.all(transformedMap); //TODO better implementation
  }

  startApp() {
    const { initialize } = this.props;
    initialize();
  }

  componentDidMount() {
    const { setOwnerEthAddress } = this.props;
    setOwnerEthAddress(TEST_ETH_ADDRESS);
  }

  renderForm() {
    if (!IS_DEV) return;

    return (
      <div style={{ padding: 50 }}>
        <div style={{ paddingTop: 50 }}>
          {" "}
          {GenesisHashInput(this.onGenesisHashChange)}
          {NumberofChunksInput(this.onNumberOfChunksChange)}
          <Button onClick={() => this.onClick()}>Look for treasures</Button>
          <Button onClick={() => this.startApp()}>Start App</Button>
          <div>
            <Button onClick={() => this.start()}>Start treasures</Button>
            <Button onClick={() => this.stop()}>Stop treasures</Button>
            <Button onClick={() => this.increment()}> +1 </Button>
            <Button onClick={() => this.decrement()}> -1 </Button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      giveConsent,
      denyConsent,
      status,
      treasures,
      numberOfCalls
    } = this.props;
    const { stressCount } = this.state;
    return (
      <Container style={{ backgroundColor: "#0267ea" }}>
        <Header as="h1" style={{ color: "#ffffff" }}>
          <Image src={LOGO} /> Oyster Webnode Demo{" "}
          {this.renderProgress(numberOfCalls, this.state.numberOfChunks)}
        </Header>
        {this.renderForm()}
        <TreasureTable treasures={!!treasures ? treasures : []} />
        {status === CONSENT_STATUS.PENDING ? (
          <ConsentOverlay giveConsent={giveConsent} denyConsent={denyConsent} />
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  statuses: state.pow.statuses,
  status: state.consent.status,
  treasures: state.test.treasures,
  numberOfCalls: state.test.numberOfCalls, //TODO remove for production
  consent: state.pow.consent
});

const mapDispatchToProps = dispatch => ({
  findTreasure: obj => dispatch(treasureHuntActions.findTreasure(obj)),
  startSector: obj => dispatch(treasureHuntActions.startSector(obj)),
  initialize: () => dispatch(nodeActions.initialize()),
  giveConsent: () => dispatch(consentActions.giveConsent()),
  denyConsent: () => dispatch(consentActions.denyConsent()),
  setOwnerEthAddress: ethAddress =>
    dispatch(nodeActions.setOwnerEthAddress(ethAddress))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Storage);
