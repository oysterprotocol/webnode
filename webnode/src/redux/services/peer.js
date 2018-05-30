import Peer from "peerjs";

import { PEER_HOST, PEER_PORT, PEER_PATH, PEER_DEBUG } from "../../config/";

const init = () => {
  const randomClient = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 8);
  const peer = new Peer(randomClient, {
    // host: PEER_HOST,
    // port: PEER_PORT,
    // path: PEER_PATH,
    // debug: PEER_DEBUG
  });
  return peer;
};

export default {
  init
};
