import React from 'react';
import { connect } from 'react-redux';

import { selectPeerId, selectConnectedPeerIds } from '../../utils/selectors';
import peerActions from '../../redux/actions/peer-actions';
import storageActions from '../../redux/actions/storage-actions';

import StorageBootstrap from 'components/storage/storage-bootstrap';

const mapStateToProps = state => ({
	storage: state.storage,
  peerId: selectPeerId(state),
  connectedPeerIds: selectConnectedPeerIds(state)
});

const mapDispatchToProps = dispatch => ({
  storageBrokerNodeAddFn: item =>
    dispatch(storageActions.storageBrokerNodeAddAction(item)),
  storageWebNodeAddFn: item =>
    dispatch(storageActions.storageWebNodeAddAction(item)),
  storageGenesisHashAddFn: item =>
    dispatch(storageActions.storageGenesisHashAddAction(item)),
  storageExchangesAddFn: (transaction_id, need_requested) =>
    dispatch(storageActions.storageExchangesAddAction(transaction_id, need_requested)),
  storagePeerIdChangeFn: item =>
    dispatch(storageActions.storagePeerIdChangeAction(item)),
  peerInitFn: () =>
    dispatch(peerActions.peerInitAction()),
  peerConnectToFn: item =>
    dispatch(peerActions.peerConnectToAction(item)),
});

const Storage = ({ storage, storageBrokerNodeAddFn, storageWebNodeAddFn, storageGenesisHashAddFn, storageExchangesAddFn, storagePeerIdChangeFn, peer }) => (
  <StorageBootstrap storage={storage} 
  	storageBrokerNodeAddFn={storageBrokerNodeAddFn}
  	storageWebNodeAddFn={storageWebNodeAddFn}
  	storageGenesisHashAddFn={storageGenesisHashAddFn}
    storageExchangesAddFn={storageExchangesAddFn}
    storagePeerIdChangeFn={storagePeerIdChangeFn}
    peer={peer}
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(Storage);
