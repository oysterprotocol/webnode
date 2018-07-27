import { createSelector } from "reselect";
import { API_ROOT_URL, SECTOR_STATUS } from "../../config/";
import { RootState } from "../../types";

const { UNCLAIMED } = SECTOR_STATUS;

const getNewGenesisHashes = (state: RootState) => state.node.newGenesisHashes;
const getBrokerNodes = (state: RootState) => state.node.brokerNodes;

const treasureHuntableGenesisHash = createSelector(
  [getNewGenesisHashes],
  newGenesisHashes =>
    newGenesisHashes.find((gh: any) => gh.sectors.includes(UNCLAIMED))
);

const treasureHuntableSector = createSelector(
  [treasureHuntableGenesisHash],
  genesisHash => {
    if (!genesisHash) {
      return null;
    }

    return genesisHash.sectors.findIndex((status: string) => status === UNCLAIMED);
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
