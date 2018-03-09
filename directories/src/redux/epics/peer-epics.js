import { combineEpics } from 'redux-observable';
import { PEER_RECEIVE_REQUEST, PEER_SEND_REQUEST } from '../actions/action-types';
import { fulfillPeerReceive, fulfillPeerSend } from '../actions/peer-actions';

const requestPeerReceiveEpics = (action$, store, { peerReceive }) =>
  action$.ofType(PEER_RECEIVE_REQUEST)
    .mergeMap(action =>
      peerReceive(action.peer)
      .flatMap(data =>
        [
          fulfillPeerReceive(data),
        ]
      )
    )

const requestPeerSendEpics = action$ =>
  action$.ofType(PEER_SEND_REQUEST)
    .map((action) => {
      const receiver = action.payload.receiver
      const connection = action.peer.connect(receiver)
      connection.on('open', () => {
        console.log('send', action.payload);
        connection.send(action.payload);
      })
      return action.payload;
    })
    .flatMap(payload => [
      fulfillPeerSend(payload),
    ])

export default combineEpics(
  requestPeerReceiveEpics,
  requestPeerSendEpics
);
