import {
  PEER_RECEIVE_REQUEST,
  PEER_RECEIVE_SUCCESS,
  PEER_SEND_REQUEST,
  PEER_SEND_SUCCESS
} from "./action-types";

export const requestPeerReceive = peer => ({
  type: PEER_RECEIVE_REQUEST,
  payload: peer
});

export const fullfillPeerReceive = data => ({
  type: PEER_RECEIVE_SUCCESS,
  payload: data
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

export const fullfillPeerSend = data => ({
  type: PEER_SEND_SUCCESS,
  payload: data
});
