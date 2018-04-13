import axios from "axios";
import { API_HEADERS, API_ROOT_URL, API_REQUEST_ERROR } from "../../config/";

const registerWebnode = address =>
  axios({
    method: "POST",
    url: `${API_ROOT_URL}/api/v2/supply/webnodes`,
    data: { address }
  });

const requestBrokerNodeAddressPoW = currentList =>
  axios({
    method: "POST",
    url: `${API_ROOT_URL}/api/v2/demand/transactions/brokernodes`,
    data: { currentList }
  });

const completeBrokerNodeAddressPoW = (txid, trytes) =>
  axios({
    method: "PUT",
    url: `${API_ROOT_URL}/api/v2/demand/transactions/brokernodes/${txid}`,
    data: { trytes }
  });

export default {
  registerWebnode,
  requestBrokerNodeAddressPoW,
  completeBrokerNodeAddressPoW
};
