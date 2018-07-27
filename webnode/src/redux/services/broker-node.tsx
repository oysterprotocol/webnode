import axios from "axios";
import { API_ROOT_URL, API_VERSION } from "../../config/";

const registerWebnode = (brokerNodeUrl: string, address: string) =>
  axios({
    method: "POST",
    url: `${brokerNodeUrl}/${API_VERSION}/supply/webnodes`,
    data: { address }
  });

const requestBrokerNodeAddressPoW = (brokerNodeUrl: string, currentList: any) =>
  axios({
    method: "POST",
    url: `${brokerNodeUrl}/${API_VERSION}/demand/transactions/brokernodes`,
    data: { currentList }
  });

const completeBrokerNodeAddressPoW = (
  brokerNodeUrl: string,
  txid: number,
  trytes: {}
) =>
  axios({
    method: "PUT",
    url: `${brokerNodeUrl}/${API_VERSION}/demand/transactions/brokernodes/${txid}`,
    data: { trytes }
  });

const requestGenesisHashPoW = (
  brokerNodeUrl: string, 
  currentList: {}
) =>
  axios({
    method: "POST",
    url: `${brokerNodeUrl}/${API_VERSION}/demand/transactions/genesis_hashes`,
    data: { currentList }
  });

const completeGenesisHashPoW = (
  brokerNodeUrl: string,
  txid: number,
  trytes: {}
) =>
  axios({
    method: "PUT",
    url: `${brokerNodeUrl}/${API_VERSION}/demand/transactions/genesis_hashes/${txid}`,
    data: { trytes }
  });

const claimTreasure = (
  ethKey: string,
  genesisHash: string,
  numberOfChunks: number,
  receiverEthAddr: string,
  sectorIdx: number
) =>
  axios({
    method: "POST",
    url: `${API_ROOT_URL}/${API_VERSION}/treasures`,
    data: {
      ethKey,
      genesisHash,
      numChunks: numberOfChunks,
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
