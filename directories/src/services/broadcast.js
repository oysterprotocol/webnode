import axios from "axios";

const axiosInstance = axios.create({
  timeout: 200000
});

export const broadcastToHooks = (trytes, nodes) => {
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
        reject();
      });
  });
};
