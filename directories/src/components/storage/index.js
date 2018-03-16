import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { peerInit } from "../../redux/api/";

import StorageBootstrap from "components/storage/storage-bootstrap";

import {
  requestPeerReceive,
  requestPeerSend
} from "../../redux/actions/peer-actions";

import {
  requestPrepareTransfers,
  requestPrepareTransfersSuccess
} from "../../redux/actions/iota-actions";
import { requestPoW, fulfillPoW } from "../../redux/actions/pow-actions";

import { broadcastToHooks } from "../../services/broadcast";

import {
  initWork,
  givePeerId,
  startTransaction,
  selectItem
} from "../../redux/actions/items-actions";

import {
  storageBrokerNodeAdd,
  storageWebNodeAdd,
  storageGenesisHashAdd,
  storageExchangesAdd,
  storagePeerIdChange
} from "../../redux/actions/storage-actions";

class Storage extends Component {
  static propTypes = {
    requestPeerReceive: PropTypes.func.isRequired,
    requestPeerSend: PropTypes.func.isRequired,
    requestPrepareTransfers: PropTypes.func.isRequired,
    requestPrepareTransfersSuccess: PropTypes.func.isRequired,
    requestPoW: PropTypes.func.isRequired,
    fulfillPoW: PropTypes.func.isRequired
  };

  state = {
    peer: null
  };

  componentDidMount() {
    const { initWork } = this.props;
    initWork();
  }

  dud() {
    const peer = peerInit();
    const {
      givePeerId,
      startTransaction,
      selectItem,
      requestPrepareTransfers,
      requestPoW,
      fulfillPoW
    } = this.props;
    this.setState({ peer });
    givePeerId({ peerid: peer.id });
    startTransaction({ need_requested: "hi!Api" });
    selectItem({ txid: "hi!Api", itemIndex: 0 });

    // ^ The above call has not modified the state tree by the time
    // we are ready to use the address, message, hooknodes, trunk, and branch
    // which should be at state.item

    // don't know enough about redux to know the best patterns to use to
    // wait until this data is available.

    //REMOVE ALL THIS DUMMY DATA AND USE DATA FROM BROKER
    //IOTA
    const data = {
      seed:
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      address:
        "OYSTERWEBNODEWORKSOYSTERWEBNODEWORKSOYSTERWEBNODEWORKSOYSTERWEBNODEWORKSOYSTERWEB",
      value: 0,
      message: "SOMECOOLMESSAGE",
      tag: "OYSTERWEBNODEWORKING"
    };

    //REMOVE ALL THIS AND USE MWM, TRUNK, AND BRANCh FROM BROKER

    const dummyTrunk =
      "9KCCKUWJUCCXGAEQTHKYUFDU9OOMEAVKCJZBBVUTVPOMJNVGHBC9UJOJTAOARFKWGI9EPMCJKFVX99999";
    const dummyBranch =
      "9ETBMNMZUXKXNGEGGHLLMQSIK9TBZEDVQUAIARPDFDWQWJFNECPHPVUIFAPWJQ9MDOCUFICJCDXSA9999";
    const mwm = 14;

    requestPrepareTransfers(data);

    requestPoW({
      trunkTransaction: dummyTrunk,
      branchTransaction: dummyBranch,
      mwm: mwm,
      trytes: [this.props.iota.iotaTransactionReceive[0].prepareTransfers[0]],
      callback: function(error, result) {
        fulfillPoW({ trytes: result });

        //REMOVE THIS HARDCODED HOOKNODE AND USE NODES SENT FROM THE BROKER
        let hardcodedHooks = ["54.208.39.116"];

        broadcastToHooks({ trytes: result }, hardcodedHooks);
      }
    });
  }

  // componentDidMount() {
  // this.props.requestPeerReceive(this.state.peer);
  // }

  sendMessage = (message, receiver) => {
    const { peer } = this.state;
    this.props.requestPeerSend(peer, receiver, message);
  };

  render() {
    const { peer } = this.state;
    const {
      storage,
      storageBrokerNodeAdd,
      storageWebNodeAdd,
      storageGenesisHashAdd,
      storageExchangesAdd,
      storagePeerIdChange
    } = this.props;

    return <div>hey</div>;
  }
}

const mapStateToProps = state => ({
  storage: state.storage,
  items: state.items,
  iota: state.iota,
  pow: state.pow
});

export default connect(mapStateToProps, {
  fulfillPoW,
  requestPrepareTransfersSuccess,
  givePeerId,
  initWork,
  requestPeerReceive,
  requestPeerSend,
  requestPoW,
  requestPrepareTransfers,
  selectItem,
  startTransaction,
  storageBrokerNodeAdd,
  storageExchangesAdd,
  storageGenesisHashAdd,
  storagePeerIdChange,
  storageWebNodeAdd
})(Storage);
