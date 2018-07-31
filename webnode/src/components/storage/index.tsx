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

interface StorageProps {
    treasures: any;
    numberOfCalls: number;
    statuses: any;
    status: string;
    consent: string;
    giveConsent: () => any;
    denyConsent: () => any;
    findTreasure: (obj: any) => any;
    initialize: () => any;
    setOwnerEthAddress: (ethAddress: string) => any;
    startSector: (obj: any) => any;
}

interface State {
    genesisHash: string;
    numberOfChunks: number;
    stressCount: number;
    intervalStress: number;
}

const GenesisHashInput = (onChange: any) => (
  <Input
    style={{ width: 1000, paddingBottom: 20 }}
    onChange={onChange}
    label={{ tag: true, content: "Genesis Hash" }}
    labelPosition="right"
    placeholder=""
  />
);

const NumberofChunksInput = (onChange: any) => (
  <Input
    onChange={onChange}
    style={{ paddingRight: 50, paddingBottom: 50 }}
    label={{ tag: true, content: "Number of Chunks" }}
    labelPosition="right"
    placeholder=""
  />
);

export class Storage extends Component<StorageProps, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      genesisHash: "",
      numberOfChunks: 0,
      stressCount: 2,
      intervalStress: 0
    };
  }

  onGenesisHashChange = (e: any, data: any) => {
    this.setState({ genesisHash: data.value });
  };

  onNumberOfChunksChange = (e: any, data: any) => {
    this.setState({ numberOfChunks: parseInt(data.value, 10) });
  };

  renderProgress(current: number, max: number) {
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
      let { stressCount} = this.state;
      if (stressCount > 0) {
          const intervalStress = window.setInterval(() => {
              this.onClick();
          }, stressCount);
          this.setState({ intervalStress: intervalStress });
      }
  }

  stop() {
    clearInterval(this.state.intervalStress)
  }

  async onClick() {
    const { findTreasure } = this.props;
    const generatedMap = Datamap.rawGenerate(
      this.state.genesisHash,
      this.state.numberOfChunks
    );

    const transformedMap = Object.values(generatedMap)
      .map((value: any, index: any) => ({
        dataMapHash: value,
        chunkIdx: index
      }))
      .map( (obj: any) => findTreasure(obj));

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

    const { numberOfCalls } = this.props;

    return (
      <div style={{ padding: 50 }}>
        <Header as="h1" style={{ color: "#ffffff" }}>
          <Image src={LOGO} /> Oyster Toolbox{" "}
          {this.renderProgress(numberOfCalls, this.state.numberOfChunks)}
        </Header>
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
    const { giveConsent, denyConsent, status, treasures } = this.props;
    return (
      <Container style={{ backgroundColor: "#0267ea" }}>
        {this.renderForm()}
        <TreasureTable treasures={!!treasures ? treasures : []} />
        {status === CONSENT_STATUS.PENDING ? (
          <ConsentOverlay giveConsent={giveConsent} denyConsent={denyConsent} status={status} />
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  statuses: state.pow.statuses,
  status: state.consent.status,
  treasures: state.test.treasures,
  numberOfCalls: state.test.numberOfCalls, //TODO remove for production
  consent: state.pow.consent
});

const mapDispatchToProps = (dispatch:any) => ({
  findTreasure: (obj: any) => dispatch(treasureHuntActions.findTreasure(obj)),
  startSector: (obj: any) => dispatch(treasureHuntActions.startSector(obj)),
  initialize: () => dispatch(nodeActions.initialize()),
  giveConsent: () => dispatch(consentActions.giveConsent()),
  denyConsent: () => dispatch(consentActions.denyConsent()),
  setOwnerEthAddress: (ethAddress: any) =>
    dispatch(nodeActions.setOwnerEthAddress(ethAddress))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Storage);
