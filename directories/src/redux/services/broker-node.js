import axios from "axios";
import { API_HEADERS, API_ROOT_URL, API_REQUEST_ERROR } from "../../config/";

const registerWebnode = address =>
  new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${API_ROOT_URL}/api/v1/supply/webnodes`,
      data: { address }
    })
    .then(data => {
      resolve({ data });
    })
    .catch(error => {
      console.log("POST registerWebnode" + error);
      reject(API_REQUEST_ERROR);
    });
  });

const claimTreasure = seed =>
  new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${API_ROOT_URL}/api/v1/supply/claimtreasure`,
      data: { seed }
    })
    .then(data => {
      resolve({ data });
    })
    .catch(error => {
      console.log("POST claimTreasure" + error);
      reject(API_REQUEST_ERROR);
    });
  });

const requestBrokerNodeAddressPoW = (currentList) =>
  new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${API_ROOT_URL}/api/v1/demand/transactions/brokernodes`,
      data: {currentList}
    })
    .then(data => {
      resolve({ data });
    })
    .catch(error => {
      console.log("POST request" + error);
      reject(API_REQUEST_ERROR);
    });
  });

const completeBrokerNodeAddressPoW = (txid, trytes) =>
  new Promise((resolve, reject) => {
    axios({
      method: "PUT",
      url: `${API_ROOT_URL}/api/v1/demand/transactions/${txid}/brokernodes`,
      data: { trytes }
    })
    .then(data => {
      resolve({ data });
    })
    .catch(error => {
      console.log("PUT complete " + error);
      reject(API_REQUEST_ERROR);
    });
  });

const requestGenesisHashPoW = (currentList) =>
  new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${API_ROOT_URL}/api/v1/demand/transactions/genesishash`,
      data: {currentList}
    })
    .then(data => {
      resolve({ data });
    })
    .catch(error => {
      console.log("POST request" + error);
      reject(API_REQUEST_ERROR);
    });
  });

const completeGenesisHashPoW = (txid, trytes) =>
  new Promise((resolve, reject) => {
    axios({
      method: "PUT",
      url: `${API_ROOT_URL}/api/v1/demand/transactions/${txid}/genesishash`,
      data: { trytes }
    })
    .then(data => {
      resolve({ data });
    })
    .catch(error => {
      console.log("PUT complete " + error);
      reject(API_REQUEST_ERROR);
    });
  });

export default {
  registerWebnode,
  requestBrokerNodeAddressPoW,
  completeBrokerNodeAddressPoW,
  requestGenesisHashPoW,
  completeGenesisHashPoW
};