export const API_ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://159.65.224.105:3000' : 'http://159.65.224.105:3000';
export const API_HEADERS = ['Content-type': 'application/json'];

export const API_URL_ITEMS = '/posts';
export const API_URL_PEER_ID = 'givePeerId';
export const API_URL_START_TRANSACTION = 'startTransaction';
export const API_URL_SELECT_NEED = 'selectNeed';

export const PEER_HOST = 'localhost';
export const PEER_PORT = 8000;
export const PEER_PATH = '/peer';
export const PEER_DEBUG = 3;

export const DEFAULT_CONSTANT = Object.freeze({
  PEER_ID: '',
  BROKER_NODE: ['127.0.0.1'],
  WEB_NODE: [],
  GENESIS_HASH: [],
  EXCHANGES_TRANSACTION_ID: '',
  EXCHANGES_NEED_REQUESTED: ''
});
