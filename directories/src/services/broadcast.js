import axios from 'axios';
import {
    API_HEADERS,
} from '../config/index.js';


export const broadcastToHooks = (transactionObject, nodes) => {
    for (let i = 0; i < nodes.length; i++) {
        let url = "http://" + nodes[i] + ":3000/broadcast/";

        broadcastTransaction(transactionObject, url);
    }
};

const broadcastTransaction = (transactionObject, nodeUrl) => {

    debugger;

    return axios({
        method: 'post',
        url: nodeUrl,
        headers: API_HEADERS,
        data: transactionObject
    }).then(result => {
        debugger;
    }).catch(error => {
        console.log('POST ' + error);
        return {error: error};
    });
};