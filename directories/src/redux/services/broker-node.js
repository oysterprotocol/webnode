import axios from "axios";
import { API_HEADERS, API_ROOT_URL, API_REQUEST_ERROR } from "../../config/";

export const requestBrokerNodeAddresses = () =>
  axios({
    method: "GET",
    url: `${API_ROOT_URL}/api/v1/broker_nodes`
  }).catch(error => {
    console.log("PUT " + error);
    return { error: API_REQUEST_ERROR };
  });
