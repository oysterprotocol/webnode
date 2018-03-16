import {
	API_URL_PEER_ID,
	API_URL_START_TRANSACTION,
	API_URL_SELECT_ITEM,
	API_URL_CONFIRM_WORK,
	API_BROADCAST_TRANSACTION_BEGIN,
	API_BROADCAST_TRANSACTION_END
} from "../../config/";

import { fetchPostApi, broadcastTransaction } from "../api";

export const requestGivePeerId = data => fetchPostApi(API_URL_PEER_ID, data);

export const requestStartTransaction = data =>
	fetchPostApi(API_URL_START_TRANSACTION, data);

export const requestSelectItem = data =>
	fetchPostApi(API_URL_SELECT_ITEM, data);

export const requestConfirmWork = data =>
	fetchPostApi(API_URL_CONFIRM_WORK, data);

export const requestBroadcastToHooks = (trytes, nodes) => {
	for (let i = 0; i < nodes.length; i++) {
		broadcastTransaction(
			trytes,
			API_BROADCAST_TRANSACTION_BEGIN + nodes[i] + API_BROADCAST_TRANSACTION_END
		);
	}
};
