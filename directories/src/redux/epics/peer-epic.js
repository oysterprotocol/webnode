import { combineEpics } from "redux-observable";
import {createPeer, connectToPeer as connect, send} from '../../api/peer-api';
import peerDomain from '../../domain/peer';
import peerActions from 'redux/actions/peer-actions';
import uuid from 'uuid';

export const initPeer = (peerOptions) => (dispatch, getState) => dispatch({
  type: peerActions.PEER_INIT,
  peer: peerDomain(createPeer(
    peerOptions,
    (id) => dispatch({type: peerActions.PEER_OPEN, id}),
    (conn) => dispatch({type: peerActions.PEER_CONNECTION, conn}),
    (action) => {
      const {peer} = getState();
      const peerInfo = action['@@PEER_META'];
      if (peerInfo.peerId === peer.id) {
        return;
      }
      dispatch({type: '@@PEER_DATA_RECEIVE', action});
      dispatch(action);
    },
    (err) => dispatch({type: '@@PEER_ERROR', err}),
  )),
});

export const connectToPeer = (remotePeerId) => (dispatch, getState) => {
  const {peer} = getState();
  dispatch({type: peerActions.PEER_CONNECTING, peer, remotePeerId});
  connect(
    peer.__peer,
    remotePeerId,
    (id) => dispatch({type: peerActions.PEER_OPEN, id}),
    (action) => {
      const {peer} = getState();
      const peerInfo = action['@@PEER_META'];
      if (peerInfo.peerId === peer.id) {
        return;
      }
      dispatch({type: '@@PEER_DATA_RECEIVE', action});
      dispatch(action);
    },
    (err) => dispatch({type: '@@PEER_ERROR', err}),
  );
};

export const sendMessage = (message) => (dispatch, getState) => {
  const { peer } = getState();
  send(peer.__peer)(message);
};

export const ignorePeerActions = ({type = ''}) => type.indexOf('PEER') !== 0;

export const peerMetadataEnhancer = (dispatch, getState, action) => {
  const meta = action['PEER_META'];
  if (meta && meta.peerId) return action;
  const { peer } = getState();
  return {
    ...action,
    '@@PEER_META': {
      id: uuid.v4(),
      ts: Date.now(),
      peerId: peer.id,
    },
  };
};

export const peerReplicateActionEnhancer = (dispatch, getState, action) => {
  const { peer } = getState();
  const meta = action['@@PEER_META'];
  if (meta && meta.peerId && (peer.id === meta.peerId)) {
    send(peer)(action)
  }
  return action;
};

export default combineEpics(initPeer, connectToPeer, sendMessage);
