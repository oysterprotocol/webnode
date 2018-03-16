import {
  API_URL_PEER_ID,
  API_URL_START_TRANSACTION,
  API_URL_SELECT_NEED
} from "../../config/";

import { fetchPostApi } from "../api";

export const requestGivePeerId = data => fetchPostApi(API_URL_PEER_ID, data);

export const requestStartTransaction = data =>
  fetchPostApi(API_URL_START_TRANSACTION, data);

export const requestSelectItem = data =>
  fetchPostApi(API_URL_SELECT_NEED, data);
