import React, {Component} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {peerInit} from '../../redux/api/';

import StorageBootstrap from 'components/storage/storage-bootstrap';

import {requestPeerReceive, requestPeerSend} from '../../redux/actions/peer-actions';

import {requestPrepareTransfers} from '../../redux/actions/iota-actions';
import {fulfillPrepareTransfers} from '../../redux/actions/iota-actions';
import {requestPoW} from '../../redux/actions/pow-actions';
import {fulfillPoW} from '../../redux/actions/pow-actions';

import {transactionObject} from 'iota.lib.js/lib/utils/utils.js';

import {broadcastToHooks} from "../../services/broadcast";

import _ from 'lodash';

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
        fulfillPoW: PropTypes.func.isRequired,
    };

    state = {
        peer: null,
    };

    componentWillMount() {
        const peer = peerInit();
        const {
            givePeerId,
            startTransaction,
            selectNeed,
            requestPrepareTransfers,
            fulfillPrepareTransfers,
            requestPoW,
            fulfillPoW
        } = this.props;
        this.setState({peer});
        givePeerId({peerid: peer.id});
        startTransaction({need_requested: 'hi!Api'});
        selectNeed({txid: 'hi!Api', item_selected: 'hash'});

        //IOTA
        const data = {
            'seed': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            'address': 'OYSTERWEBNODEWORKSOYSTERWEBNODEWORKSOYSTERWEBNODEWORKSOYSTERWEBNODEWORKSOYSTERWEB',
            'value': 0,
            'message': 'SOMECOOLMESSAGE',
            'tag': 'OYSTERWEBNODEWORKING'
        };

        const dummyTrunk = '9KCCKUWJUCCXGAEQTHKYUFDU9OOMEAVKCJZBBVUTVPOMJNVGHBC9UJOJTAOARFKWGI9EPMCJKFVX99999';
        const dummyBranch = '9ETBMNMZUXKXNGEGGHLLMQSIK9TBZEDVQUAIARPDFDWQWJFNECPHPVUIFAPWJQ9MDOCUFICJCDXSA9999';
        const mwm = 14;

        requestPrepareTransfers(data);

        const powParams = {
            trunkTransaction: dummyTrunk,
            branchTransaction: dummyBranch,
            mwm: mwm,
            trytes: [this.props.iota.iotaTransactionReceive[0].prepareTransfers[0]],
            callback: function (error, result) {

                let transaction = transactionObject(result[0]);
                let Transaction = {};

                fulfillPoW(transaction);

                _.forEach(transaction, function(value, key) {
                   Transaction[_.startCase(key)] = value;
                });

                let hardcodedHooks = ['54.208.39.116'];

                broadcastToHooks({trytes: [Transaction]}, hardcodedHooks);
            }
        };

        requestPoW(powParams);
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
        const {
            storage,
            storageBrokerNodeAdd,
            storageWebNodeAdd,
            storageGenesisHashAdd,
            storageExchangesAdd,
            storagePeerIdChange
        } = this.props;

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
    items: state.items,
    iota: state.iota,
    pow: state.pow

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
    requestPoW,
    fulfillPoW
})(Storage);
