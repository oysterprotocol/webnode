import {createSelector} from 'reselect';
import uniq from 'lodash/uniq';

export const selectPeer = (state) => state.peer || {};

export const selectPeerId = createSelector(
  selectPeer,
  (peer) => peer.id || 'not connected'
);

export const selectConnectedPeerIds = createSelector(
  selectPeer,
  (peer) => uniq(Object.keys(peer.connections || {}))
);