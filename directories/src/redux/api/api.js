import axios from 'axios';

import {
  API_HEADERS,
  API_ROOT_URL,
  API_REQUEST_ERROR
} from '../../config/';

export const fetchGetApi = (url, needle = '', headers = API_HEADERS) => {
	return axios({
		method: 'get',
		url: `${API_ROOT_URL}` + url + needle,
		headers: headers
	}).catch(error => {
    	console.log('GET ' + error);
    	return {error: API_REQUEST_ERROR};
	});
};

export const fetchPostApi = (url, data = {}, headers = API_HEADERS) => {
	return axios({
		method: 'post',
		url: `${API_ROOT_URL}` + url,
		headers: headers,
		data: data
	}).catch(error => {
    	console.log('POST ' + error);
    	return {error: API_REQUEST_ERROR};
	});
};
