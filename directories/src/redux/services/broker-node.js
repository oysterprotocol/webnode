import axios from "axios";
import { API_ROOT_URL, API_VERSION } from "../../config/";

const registerWebnode = address =>
  axios({
    method: "POST",
    url: `${API_ROOT_URL}/${API_VERSION}/supply/webnodes`,
    data: { address }
  });

const claimTreasure = (seed, genesisHash, numberOfChunks) =>
  axios({
    method: "POST",
    url: `${API_ROOT_URL}/${API_VERSION}/supply/claim_treasure`,
    data: { seed, genesisHash, numberOfChunks }
  });

const requestBrokerNodeAddressPoW = (currentList) =>
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

const requestGenesisHashPoW = (currentList) =>
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

const requestOldGenesisHashPoW = (currentList) =>
  axios({
    method: "POST",
    url: `${API_ROOT_URL}/${API_VERSION}/demand/transactions/old_genesis_hashes`,
    data: { currentList }
  });

const completeOldGenesisHashPoW = (txid, trytes) =>
  axios({
    method: "PUT",
    url: `${API_ROOT_URL}/${API_VERSION}/demand/transactions/old_genesis_hashes/${txid}`,
    data: { trytes }
  });

export default {
  registerWebnode,
  requestBrokerNodeAddressPoW,
  completeBrokerNodeAddressPoW,
  requestGenesisHashPoW,
  completeGenesisHashPoW,
  requestOldGenesisHashPoW,
  completeOldGenesisHashPoW,
  claimTreasure
};