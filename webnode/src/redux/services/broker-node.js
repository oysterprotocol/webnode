import axios from "axios";
import { API_ROOT_URL, API_VERSION } from "../../config/";

const registerWebnode = address =>
  axios({
    method: "POST",
    url: `${API_ROOT_URL}/${API_VERSION}/supply/webnodes`,
    data: { address }
  });

const requestBrokerNodeAddressPoW = currentList =>
  axios({
    method: "POST",
    url: `${API_ROOT_URL}/${API_VERSION}/demand/transactions/brokernodes`,
    data: { currentList }
  });

const completeBrokerNodeAddressPoW = (txid, trytes) =>
  axios({
    method: "PUT",
    url: `${API_ROOT_URL}/${API_VERSION}/demand/transactions/brokernodes/${txid}`,
    data: { trytes }
  });

const requestGenesisHashPoW = currentList =>
  axios({
    method: "POST",
    url: `${API_ROOT_URL}/${API_VERSION}/demand/transactions/genesis_hashes`,
    data: { currentList }
  });

const completeGenesisHashPoW = (txid, trytes) =>
  axios({
    method: "PUT",
    url: `${API_ROOT_URL}/${API_VERSION}/demand/transactions/genesis_hashes/${txid}`,
    data: { trytes }
  });

const claimTreasure = ({
  ethKey,
  genesisHash,
  numChunks,
  receiverEthAddr,
  sectorIdx
}) =>
  axios({
    method: "POST",
    url: `${API_ROOT_URL}/${API_VERSION}/treasures`,
    data: {
      ethKey,
      genesisHash,
      numChunks,
      receiverEthAddr,
      sectorIdx
    }
  });

export default {
  registerWebnode,
  requestBrokerNodeAddressPoW,
  completeBrokerNodeAddressPoW,
  requestGenesisHashPoW,
  completeGenesisHashPoW,
  claimTreasure
};
