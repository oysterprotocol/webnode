import axios from "axios";
import { API_HEADERS, API_ROOT_URL, API_REQUEST_ERROR } from "../../config/";

const registerWebnode = address =>
  axios({
    method: "POST",
    url: `${API_ROOT_URL}/api/v1/supply/webnodes`,
    data: { address }
  }).catch(error => {
    console.log("POST " + error);
    return { error: API_REQUEST_ERROR };
  });

const requestBrokerNodeAddresses = currentList =>
  axios({
    method: "POST",
    url: `${API_ROOT_URL}/api/v1/demand/transactions/brokernodes`,
    data: { currentList }
  }).catch(error => {
    console.log("PUT " + error);
    return { error: API_REQUEST_ERROR };
  });

export default {
  registerWebnode,
  requestBrokerNodeAddresses
};
