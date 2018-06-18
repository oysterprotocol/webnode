import axios from "axios";
import { API_ROOT_URL, API_VERSION } from "../../config/";

const registerWebnode = ({ brokerNodeUrl, address }) =>
  axios({
    method: "POST",
    url: `${brokerNodeUrl}/${API_VERSION}/supply/webnodes`,
    data: { address }
  });

const requestBrokerNodeAddressPoW = ({ brokerNodeUrl, currentList }) =>
  axios({
    method: "POST",
    url: `${brokerNodeUrl}/${API_VERSION}/demand/transactions/brokernodes`,
    data: { currentList }
  });

const completeBrokerNodeAddressPoW = ({ brokerNodeUrl, txid, trytes }) =>
  axios({
    method: "PUT",
    url: `${brokerNodeUrl}/${API_VERSION}/demand/transactions/brokernodes/${txid}`,
    data: { trytes }
  });

const requestGenesisHashPoW = ({ brokerNodeUrl, currentList }) =>
  axios({
    method: "POST",
    url: `${brokerNodeUrl}/${API_VERSION}/demand/transactions/genesis_hashes`,
    data: { currentList }
  });

const completeGenesisHashPoW = ({ brokerNodeUrl, txid, trytes }) =>
  axios({
    method: "PUT",
    url: `${brokerNodeUrl}/${API_VERSION}/demand/transactions/genesis_hashes/${txid}`,
    data: { trytes }
  });

const claimTreasure = ({
  ethKey,
  genesisHash,
  numberOfChunks,
  receiverEthAddr,
  sectorIdx
}) =>
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
