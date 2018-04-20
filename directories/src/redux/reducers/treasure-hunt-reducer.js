import { CHUNKS_PER_SECTOR, SECTOR_STATUS } from "../../config/";

import treasureHuntActions from "../actions/treasure-hunt-actions";

const initState = {
  genesisHash: null,
  chunkIdx: 0,
  numberOfChunks: 1,
  sector: 0,
  treasureFound: false
};

export default (state = initState, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};
