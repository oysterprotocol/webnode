import Rx from 'rxjs';
import Peer from 'peerjs';

import {
  PEER_HOST,
  PEER_PORT,
  PEER_PATH,
  PEER_DEBUG
} from '../../config/';

export default peer =>
  Rx.Observable.create((observer) => {
    peer.on('connection', (connection) => {
      connection.on('data', (data) => {
        observer.next(data);
      });
    });
  });

export const peerInit = () => {
	const randomClient =  Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
  const peer = new Peer(
    randomClient, {host: PEER_HOST, port: PEER_PORT, path: PEER_PATH, debug: PEER_DEBUG}
  );
  return peer;
}
