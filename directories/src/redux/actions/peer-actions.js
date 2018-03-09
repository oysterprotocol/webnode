import {
  PEER_RECEIVE_REQUEST,
  PEER_RECIEVE_SUCCESS,
  PEER_SEND_REQUEST,
  PEER_SEND_SUCCESS
} from './action-types';

export const requestPeerReceive = peer => ({
  type: PEER_RECEIVE_REQUEST,
  peer
});

export const fulfillPeerReceive = payload => ({
  type: PEER_RECIEVE_SUCCESS,
  payload
});

export const requestPeerSend = (peer, receiver, message) => ({
  type: PEER_SEND_REQUEST,
  peer,
  payload: {
    message,
    receiver,
    sender: peer.id
  }
});

export const fulfillPeerSend = payload => ({
  type: PEER_SEND_SUCCESS,
  payload
});