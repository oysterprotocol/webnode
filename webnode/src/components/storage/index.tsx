import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { RootState } from "../../types";

import Semantic from "semantic-ui-react";
import { CONSENT_STATUS } from "../../config";

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
  findTreasure: (obj: string) => any;
  initialize: () => any;
  setOwnerEthAddress: (ethAddress: string) => any;
  startSector: (obj: string) => any;
}

interface State {
  genesisHash: string;
  numberOfChunks: number;
  stressCount: number;
  intervalStress: number;
}

export class Storage extends React.Component<StorageProps, State> {

  constructor(props: StorageProps) {
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

  render() {
    const {
      treasures,
      numberOfCalls,
      giveConsent,
      denyConsent,
      status
    } = this.props;
    const { stressCount } = this.state;
    return (
      <Semantic.Container style={{ backgroundColor: "#0267ea" }}>
        <div style={{ padding: 50 }}>
          <Semantic.Header as="h1" style={{ color: "#ffffff" }}>
            <Semantic.Image src={LOGO} /> Oyster Toolbox{" "}
            {this.renderProgress(numberOfCalls, this.state.numberOfChunks)}
          </Semantic.Header>{" "}
          <div style={{ paddingTop: 50 }}>
            {" "}
            {GenesisHashInput(this.onGenesisHashChange)}
            {NumberofChunksInput(this.onNumberOfChunksChange)}
            <Semantic.Button onClick={() => this.onClick()}>Look for treasures</Semantic.Button>
            <Semantic.Button onClick={() => this.startApp()}>Start App</Semantic.Button>
            <div>
              <Semantic.Button onClick={() => this.start()}>Start treasures</Semantic.Button>
              <Semantic.Button onClick={() => this.stop()}>Stop treasures</Semantic.Button>
              <Semantic.Button onClick={() => this.increment()}> +1 </Semantic.Button>
              <Semantic.Button onClick={() => this.decrement()}> -1 </Semantic.Button>
              <div>loop {stressCount}</div>
            </div>
          </div>
          {treasures.length !== 0 ? TreasureTable(treasures) : null}
        </div>
        {status === CONSENT_STATUS.PENDING ? (
          <ConsentOverlay status={status} giveConsent={giveConsent} denyConsent={denyConsent} />
        ) : null}
      </Semantic.Container>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  statuses: state.pow.statuses,
  status: state.consent.status,
  treasures: state.test.treasures,
  numberOfCalls: state.test.numberOfCalls, //TODO remove for production
  consent: state.pow.consent
});

const mapDispatchToProps = (dispatch: Dispatch<StorageProps>) => 
  bindActionCreators(
    {
      findTreasure: (obj: string) => treasureHuntActions.findTreasure(obj),
      startSector: (obj: string) => treasureHuntActions.startSector(obj),
      initialize: nodeActions.initialize,
      giveConsent: consentActions.giveConsent,
      denyConsent: consentActions.denyConsent,
      setOwnerEthAddress: (ethAddress: string) => nodeActions.setOwnerEthAddress(ethAddress)
    }
    , dispatch
  );

const GenesisHashInput = (onChange: any) => (
  <Semantic.Input
    style={{ width: 1000, paddingBottom: 20 }}
    onChange={onChange}
    label={{ tag: true, content: "Genesis Hash" }}
    labelPosition="right"
    placeholder=""
  />
);

const NumberofChunksInput = (onChange: any) => (
  <Semantic.Input
    onChange={onChange}
    style={{ paddingRight: 50, paddingBottom: 50 }}
    label={{ tag: true, content: "Number of Chunks" }}
    labelPosition="right"
    placeholder=""
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(Storage);

