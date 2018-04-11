import axios from "axios";
import { API_HEADERS, API_ROOT_URL, API_REQUEST_ERROR } from "../../config/";

const axiosInstance = axios.create({
  timeout: 200000
});

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
      console.log("POST register" + error);
      reject(API_REQUEST_ERROR);
    });
  });


const requestAddressPoW = (currentList, to) =>
  new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${API_ROOT_URL}/api/v1/demand/transactions/${to}`,
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

const completeAddressPoW = (txid, trytes, to) =>
  new Promise((resolve, reject) => {
    axios({
      method: "PUT",
      url: `${API_ROOT_URL}/api/v1/demand/transactions/${txid}/${to}`,
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

const broadcastToHooks = (trytes, nodes) => {
  const broadcasts = nodes.map(node => {
    let url = `http://${node}:3000/broadcast/`;
    return broadcastTransaction(trytes, url);
  });
  return Promise.all(broadcasts);
};

const broadcastTransaction = (trytes, nodeUrl) => {
  new Promise((resolve, reject) => {
    axiosInstance
      .post(nodeUrl, trytes)
      .then(response => {
        console.log("TRYTES BROADCAST TO HOOKNODE/S: ", response);
        resolve(response);
      })
      .catch(error => {
        console.log("ERROR BROADCASTING TRYTES TO HOOKNODE/S: ", error);
        reject(API_REQUEST_ERROR);
      });
  });
};

const getStorageFn = (random) => {
  let title = "";
  switch (random) {
    case 0:
      title = "brokernodes";
      break;
    case 1:
      title = "genesis_hash";
      break;
    default:
      title = "brokernodes";
  }
  return title;
};

const randomFn = (maxNumber) => {
  const random = Math.floor(Math.random() * (maxNumber + 1));
  return random;
};

export default {
  registerWebnode,
  requestAddressPoW,
  completeAddressPoW,
  broadcastToHooks,
  getStorageFn,
  randomFn
};
