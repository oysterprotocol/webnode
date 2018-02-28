import axios from 'axios';

import {
  API_HEADERS,
  API_ROOT_URL
} from '../../config/';

export const fetchGetApi = (url, needle = '', headers = API_HEADERS) => {
	return axios({
		method: 'get',
		url: `${API_ROOT_URL}` + url + needle,
		headers: headers
	});
}

export const fetchPostApi = (url, data = {}, headers = API_HEADERS) => {
	return axios({
		method: 'post',
		url: `${API_ROOT_URL}` + url,
		headers: headers,
		data: data
	});
}
