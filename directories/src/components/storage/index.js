import React, {Component} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {peerInit} from '../../redux/api/';

import StorageBootstrap from 'components/storage/storage-bootstrap';

import {requestPeerReceive, requestPeerSend} from '../../redux/actions/peer-actions';

import {requestPrepareTransfers} from '../../redux/actions/iota-actions';
import {fulfillPrepareTransfers} from '../../redux/actions/iota-actions';
import {requestPoW} from '../../redux/actions/iota-actions';

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
        requestPrepareTransfers: PropTypes.func.isRequired,
        fulfillPrepareTransfers: PropTypes.func.isRequired,
        requestPoW: PropTypes.func.isRequired,
    };

    state = {
        peer: null
    };

    componentWillMount() {
        const peer = peerInit();
        const {givePeerId, startTransaction, selectNeed, requestPrepareTransfers, fulfillPrepareTransfers, requestPoW} = this.props;
        this.setState({peer});
        givePeerId({peerid: peer.id});
        startTransaction({need_requested: 'hi!Api'});
        selectNeed({txid: 'hi!Api', item_selected: 'hash'});

        //IOTA
        const data = {
            'seed': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            'address': 'SSEWOZSDXOVIURQRBTBDLQXWIXOLEUXHYBGAVASVPZ9HBTYJJEWBR9PDTGMXZGKPTGSUDW9QLFPJHTIEQ',
            'value': 0,
            'message': 'SOMECOOLMESSAGE',
            'tag': 'SOMECOOLTAG'
        };

        console.log('------------------------------');
        console.log('------------------------------');
        console.log('------------------------------');
        console.log('------------------------------');
        console.log('------------------------------');
        console.log('------------------------------');
        console.log('------------------------------');

        var result = requestPrepareTransfers(data);
        var result2 = fulfillPrepareTransfers();

        console.log('RESULT IS');
        console.log(result);
        console.log('RESULT2 IS');
        console.log(result2);

        console.log('------------------------------');
        console.log('------------------------------');
        console.log('------------------------------');
        console.log('------------------------------');
        console.log('------------------------------');
        console.log('------------------------------');
        console.log('------------------------------');
    }

    componentDidMount() {
        this.props.requestPeerReceive(this.state.peer);
    };

    sendMessage = (message, receiver) => {
        const {peer} = this.state;
        this.props.requestPeerSend(peer, receiver, message);
    };

    render() {
        const {peer} = this.state;
        console.log(peer);
        const {
            storage,
            storageBrokerNodeAdd,
            storageWebNodeAdd,
            storageGenesisHashAdd,
            storageExchangesAdd,
            storagePeerIdChange
        } = this.props;

        console.log(this.props);

        return (
            <StorageBootstrap
                storage={storage}
                storageBrokerNodeAddFn={storageBrokerNodeAdd}
                storageWebNodeAddFn={storageWebNodeAdd}
                storageGenesisHashAddFn={storageGenesisHashAdd}
                storageExchangesAddFn={storageExchangesAdd}
                storagePeerIdChangeFn={storagePeerIdChange}
                onSendMessage={(message, receiver) => this.sendMessage(message, receiver)}
                peer={peer}
            />
        )
    }
}

const mapStateToProps = state => ({
    storage: state.storage,
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
    selectNeed,
    requestPrepareTransfers,
    fulfillPrepareTransfers,
    requestPoW
})(Storage);
