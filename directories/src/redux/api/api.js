import axios from "axios";

import { API_HEADERS, API_ROOT_URL, API_REQUEST_ERROR } from "../../config/";

const axiosInstance = axios.create({
    timeout: 200000
});

export const fetchGetApi = (url, needle = "", headers = API_HEADERS) => {
  return axios({
    method: "get",
    url: `${API_ROOT_URL}` + url + needle,
    headers: headers
  }).catch(error => {
    console.log("GET " + error);
    return { error: API_REQUEST_ERROR };
  });
};

export const fetchPostApi = (url, data = {}, headers = API_HEADERS) => {
  return axios({
    method: "post",
    url: `${API_ROOT_URL}` + url,
    headers: headers,
    data: data
  }).catch(error => {
    console.log("POST " + error);
    return { error: API_REQUEST_ERROR };
  });
};

export const broadcastTransaction = (trytes, nodeUrl) => {
  new Promise((resolve, reject) => {
    axiosInstance
      .post(nodeUrl, trytes)
      .then(response => {
        console.log("TRYTES BROADCAST TO HOOKNODE/S: ", response);
        resolve(response);
      })
      .catch(error => {
        console.log("ERROR BROADCASTING TRYTES TO HOOKNODE/S: ", error);
        reject();
      });
  });
};

