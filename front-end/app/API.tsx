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
			headers: {
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

	async post(pathname: string, data: {[key: string]: string}, headers: {}) {
		await this.update_token();
		const config = this.get_config(headers);
		return await instance.post(pathname, data, config);
	}
	async put(pathname: string, data: {[key: string]: string}, headers: {}) {
		await this.update_token();
		const config = this.get_config(headers);
		return await instance.put(pathname, data, config);
	}
	async patch(pathname: string, data: {[key: string]: string}, headers: {}) {
		await this.update_token();
		const config = this.get_config(headers);
		return await instance.patch(pathname, data, config);
	}

	async login(username: string, password: string) {
		if (typeof window === 'undefined') {
			return false;
		}
		const form = new FormData();
		form.append('college_id', username);
		form.append('password', password);
		const request = await instance.post(get_url('login'), form);
		for (let key in request.data) {
			window.localStorage.setItem(key, request.data[key]);
		}
		return request;
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
				window.location.href = '/';
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
		if (typeof window === 'undefined') return false;
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
	if (token === null || token.trim() === '') {
		return null;
	}
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

const is_logged_in = () => {
	if (typeof window === 'undefined') {
		return false;
	}
	const access = API.jwt(window.localStorage.getItem('access') || '');
	if (access === null) {
		return false;
	}
	const refresh = API.jwt(window.localStorage.getItem('refresh') || '');
	if (refresh === null) {
		return false;
	}
	return parseInt(refresh.exp) >= parseInt(String(new Date().getTime() / 1000));
};

const user_detail = () => {
	if (typeof window !== undefined) {
		const access = window.localStorage.getItem('access');
		if (access !== null) {
			return {
				pk: parseJwt(access).user_id,
				college_id: localStorage.getItem('id'),
				role: {
					name: localStorage.getItem('role_name'),
					code: localStorage.getItem('role_code'),
				},
				name: localStorage.getItem('name'),
			};
		}
		return undefined;
	}
};

const API: {[key: string]: any} = {
	Axios: AxiosInstance,
	jwt: parseJwt,
	get_url: get_url,
	is_logged_in: is_logged_in,
	get_user_detail: user_detail,
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
	'event:ongoing_list': () => {
		return 'event/ongoing/list/';
	},
	'event:upcoming_list': () => {
		return 'event/upcoming/list/';
	},
	'event:detail': (id: Number) => {
		return `event/detail/${id}/`;
	},
	'event:club_branch': () => {
		return 'event/club/branch/';
	},
	'event:create': () => {
		return 'event/create/';
	},
	'event:update': (id: Number) => {
		return `event/update/${id}/`;
	},
	'event:apply': (id: Number) => {
		return `event/apply/${id}/`;
	},
	'user:organizer': () => {
		return 'user/organizer/';
	},
};

export default API;
