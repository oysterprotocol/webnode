import axios from "axios";
import { API_HEADERS, API_ROOT_URL, API_REQUEST_ERROR } from "../../config/";

const registerWebnode = address =>
  new Promise((resolve, reject) => {
    resolve({ data: {} });
  });
// axios({
// method: "POST",
// url: `${API_ROOT_URL}/api/v1/supply/webnodes`,
// data: { address }
// }).catch(error => {
// console.log("POST " + error);
// return { error: API_REQUEST_ERROR };
// });

const requestBrokerNodeAddressPoW = currentList =>
  new Promise((resolve, reject) => {
    resolve({
      data: {
        id: "tx1",
        pow: {
          message: "FAKE_MESSAGE",
          address: "FAKE_ADDRESS",
          branchTransaction: "FAKE_BRANCH",
          trunkTransaction: "FAKE_TRUNK"
        }
      }
    });
  });
// axios({
// method: "POST",
// url: `${API_ROOT_URL}/api/v1/demand/transactions/brokernodes`,
// data: { currentList }
// }).catch(error => {
// console.log("PUT " + error);
// return { error: API_REQUEST_ERROR };
// });

const completeBrokerNodeAddressPoW = (txid, trytes) =>
  new Promise((resolve, reject) => {
    resolve({
      data: {
        id: "tx1",
        purchase: "SUCCESS.SUCCESS.COM"
      }
    });
  });
// axios({
// method: "PUT",
// url: `${API_ROOT_URL}/api/v1/demand/transactions/brokernodes/${txid}`,
// data: { trytes }
// }).catch(error => {
// console.log("PUT " + error);
// return { error: API_REQUEST_ERROR };
// });

export default {
  registerWebnode,
  requestBrokerNodeAddressPoW
};
