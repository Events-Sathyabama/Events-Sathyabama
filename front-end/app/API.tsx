import axios from 'axios';
import {Constructor} from 'type-fest';

const instance = axios.create({
	baseURL: (() => {
		if (typeof window !== 'undefined') {
			return (
				window.location.protocol + '//' + window.location.hostname + ':8000/api/'
			);
		}
		return '';
	})(),
	// withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'Authorization':
			'Bearer ' +
			(() => {
				if (
					typeof window !== 'undefined' &&
					window.localStorage.hasOwnProperty('access')
				) {
					return window.localStorage.access;
				}
				return '';
			})(),
	},
});

const hierarchy = {
	0: 'Student',
	1: 'Teacher',
	2: 'HOD',
	3: 'Dean',
	4: 'Vice-Chancellor',
};

class AxiosInstance {
	get_config(headers?: any) {
		return {
			'Content-Type': 'application/json',
			'headers': {
				...headers,
				Authorization: (() => {
					if (
						typeof window !== 'undefined' &&
						window.localStorage.hasOwnProperty('access')
					) {
						return 'Bearer ' + window.localStorage.access;
					}
					return '';
				})(),
			},
		};
	}

	async post(pathname: string, data: {[key: string]: string}, headers?: any) {
		await this.update_token();
		const config = this.get_config(headers);
		const form_data = new FormData();
		for (let key in data) {
			form_data.append(String(key), String(data[key]));
		}
		return await instance.post(pathname, form_data, config);
	}

	async login(username: string, password: string) {
		if (typeof window !== 'undefined') {
			const request = await this.post(get_url('login'), {
				college_id: username,
				password: password,
			});
			window.localStorage.setItem('access', request.data.access);
			window.localStorage.setItem('refresh', request.data.refresh);

			const role = 0; // TODO role here
			window.localStorage.setItem('role', String(role));
			window.localStorage.setItem('role_name', hierarchy[role]);

			return request;
		}
	}

	async get(pathname: string, data?: {[key: string]: string}, headers?: any) {
		await this.update_token();
		const config = this.get_config(headers);
		let data_str = '?';
		if (data !== null) {
			for (let key in data) {
				data_str += `${key}=${data[key]}&`;
			}
		}
		return await instance.get(pathname + data_str, config);
	}

	async update_token() {
		let status = false;
		// debugger;
		if (!this.__check_expiry()) {
			status = await this.__refresh_token();
			if (!status) {
				// window.location.replace('/')
			}
		}
		return status;
	}

	async __refresh_token() {
		if (typeof window === 'undefined') return false;

		const token = window.localStorage.getItem('refresh');
		const expiryTime = token !== null ? parseJwt(token).exp : null;
		let currTime = parseInt(String(new Date().getTime() / 1000));
		if (expiryTime === null || token === null || parseInt(expiryTime) < currTime) {
			return false;
		}
		const form_data = new FormData();
		form_data.append('refresh', token);
		const request = await instance.post(get_url('token_refresh'), form_data);
		if (request.status !== 200) {
			return false;
		}
		const access = request.data.access;
		if (access === null) {
			return false;
		}
		window.localStorage.setItem('access', access);
		return true;
	}

	__check_expiry() {
		const token = window.localStorage.getItem('access');
		if (token !== null) {
			const expiryTime = parseJwt(token).exp;
			return (
				expiryTime !== null &&
				parseInt(expiryTime) >= parseInt(String(new Date().getTime() / 1000))
			);
		}
		return false;
	}
}

function parseJwt(token: string) {
	let base64Url = token.split('.')[1];
	let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	let jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join('')
	);
	return JSON.parse(jsonPayload);
}

function get_url(key: string, params?: Array<string>) {
	if (params) {
		return url[key](...params);
	}
	return url[key]();
}

const API: {[key: string]: any} = {
	Axios: AxiosInstance,
	jwt: parseJwt,
	get_url: get_url,
};

const url: {[key: string]: Function} = {
	'login': () => {
		return 'user/token/';
	},
	'profile_detail': (id: Number) => {
		return `user/detail/${id}/`;
	},
	'token_refresh': () => {
		return `user/token/refresh/`;
	},
	'event:completed_list': () => {
		return 'event/completed/list/';
	},
	'event:detail': (id: Number) => {
		return `event/detail/${id}`;
	},
};

export default API;
