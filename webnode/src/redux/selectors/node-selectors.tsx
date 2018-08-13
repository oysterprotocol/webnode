import { createSelector } from "reselect";
import { API_ROOT_URL, SECTOR_STATUS } from "../../config";

const { UNCLAIMED } = SECTOR_STATUS;

const getNewGenesisHashes = state => state.node.newGenesisHashes;
const getBrokerNodes = state => state.node.brokerNodes;

const treasureHuntableGenesisHash = createSelector(
  [getNewGenesisHashes],
  newGenesisHashes =>
    newGenesisHashes.find(gh => gh.sectors.includes(UNCLAIMED))
);

const treasureHuntableSector = createSelector(
  [treasureHuntableGenesisHash],
  genesisHash => {
    if (!genesisHash) {
      return null;
    }

    return genesisHash.sectors.findIndex(status => status === UNCLAIMED);
  }
);

const brokerNodeUrl = createSelector([getBrokerNodes], brokerNodes => {
  return brokerNodes.length ? brokerNodes[0].address : API_ROOT_URL;
});

export default {
  treasureHuntableGenesisHash,
  treasureHuntableSector,
  brokerNodeUrl
};
