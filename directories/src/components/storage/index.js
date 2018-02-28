import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { peerInit } from '../../redux/api/';
import StorageBootstrap from 'components/storage/storage-bootstrap';

import { requestPeerReceive, requestPeerSend } from '../../redux/actions/peer-actions';
import {
  fetchItemsRequest,
  givePeerId,
  startTransaction,
  selectNeed
} from '../../redux/actions/items-actions';

import { 
  storageBrokerNodeAdd,
  storageWebNodeAdd,
  storageGenesisHashAdd,
  storageExchangesAdd,
  storagePeerIdChange
} from '../../redux/actions/storage-actions';

class Storage extends Component {
  static propTypes = {
    requestPeerReceive: PropTypes.func.isRequired,
    requestPeerSend: PropTypes.func.isRequired,
  }

  state = {
    peer: null
  }

  componentWillMount() {
    const peer = peerInit();
    this.setState({ peer });
    this.props.givePeerId({ peerid: peer.id });
    this.props.startTransaction({ need_requested: 'hi!Api' });
    this.props.selectNeed({ txid: 'hi!Api', item_selected: 'hash' });
  }

  componentDidMount() {
    this.props.requestPeerReceive(this.state.peer);
  }

  sendMessage = (message, receiver) => {
    const { peer } = this.state;
    this.props.requestPeerSend(peer, receiver, message);
  }

  render() {
    const { peer } = this.state;
    console.log(peer);
    const { 
      storage, 
      storageBrokerNodeAdd,
      storageWebNodeAdd,
      storageGenesisHashAdd, 
      storageExchangesAdd,
      storagePeerIdChange,
      peerStorage
    } = this.props
    
    console.log(this.props);
    
    return (
      <StorageBootstrap 
        storage={storage} 
        storageBrokerNodeAddFn={storageBrokerNodeAdd}
        storageWebNodeAddFn={storageWebNodeAdd}
        storageGenesisHashAddFn={storageGenesisHashAdd}
        storageExchangesAddFn={storageExchangesAdd}
        storagePeerIdChangeFn={storagePeerIdChange}
        onSendMessage={ (message, receiver) => this.sendMessage(message, receiver) }
        peerStorage={peerStorage}
        peer={peer}
      />
    )
  }
}

const mapStateToProps = state => ({
  storage: state.storage,
  peerStorage: state.peerStorage,
  items: state.items
});

export default connect(mapStateToProps, { 
  requestPeerReceive, 
  requestPeerSend,
  storageBrokerNodeAdd,
  storageWebNodeAdd,
  storageGenesisHashAdd,
  storageExchangesAdd,
  storagePeerIdChange,
  fetchItemsRequest,
  givePeerId,
  startTransaction,
  selectNeed
})(Storage);
