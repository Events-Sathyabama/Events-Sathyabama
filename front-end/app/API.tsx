import axios from 'axios';
import React from 'react';
import handleError from './handleError';

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
	async __make_call(callback: Function, config: Function, setCode?: Function) {
		if (typeof setCode === 'function') {
			setCode(0);
		}
		const status = await this.update_token();
		if (status) {
			return await callback(config());
		}
		if (typeof setCode === 'function') {
			setCode(999);
		}
		throw {status: 999, message: 'Refresh Token Failed!!'};
	}

	get_config(headers?: any): any {
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

	async post(
		pathname: string,
		data: {[key: string]: string},
		headers?: {},
		setLoadingCode?: Function
	) {
		return await this.__make_call(
			async (config: any) => await instance.post(pathname, data, config),
			() => this.get_config(headers),
			setLoadingCode
		);
	}
	async put(
		pathname: string,
		data: {[key: string]: string},
		headers: {},
		setLoadingCode?: Function
	) {
		return await this.__make_call(
			async (config: any) => await instance.put(pathname, data, config),
			() => this.get_config(headers),
			setLoadingCode
		);
	}
	async patch(
		pathname: string,
		data: {[key: string]: string},
		headers: {},
		setLoadingCode?: Function
	) {
		return await this.__make_call(
			async (config: any) => await instance.patch(pathname, data, config),
			() => this.get_config(headers),
			setLoadingCode
		);
	}
	async get(
		pathname: string,
		data?: {[key: string]: string},
		headers?: any,
		setLoadingCode?: Function
	) {
		let data_str = '?';
		if (data !== null) {
			for (let key in data) {
				data_str += `${key}=${data[key]}&`;
			}
		}
		return await this.__make_call(
			async (config: any) => await instance.get(pathname + data_str, config),
			() => this.get_config(headers),
			setLoadingCode
		);
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

	async send_otp(college_id: string) {
		const response = await instance.post(get_url('user:send_otp'), {
			college_id: college_id,
		});
		return response;
	}

	async verify_otp(otp: string) {
		const response = await instance.post(get_url('user:verify_otp'), {otp: otp});
		return response;
	}

	async reset_password(password1: string, passwrod2: string) {
		const response = await instance.post(get_url('user:reset_password'), {
			password1: password1,
			passwrod2: passwrod2,
		});
		return response;
	}

	async update_token() {
		let status = true;
		if (this.__tokenIsExpired()) {
			status = await this.__refresh_token();
			if (!status) {
				window.location.href = '/';
			}
		}
		return status;
	}

	async __refresh_token() {
		const token = window.localStorage.getItem('refresh');
		const expiryTime = token !== null ? parseJwt(token).exp : null;
		let currTime = parseInt(String(new Date().getTime() / 1000));
		if (expiryTime === null || token === null || parseInt(expiryTime) < currTime) {
			return false;
		}
		const form_data = new FormData();
		form_data.append('refresh', token);

		let request;
		try {
			request = await instance.post(get_url('token_refresh'), form_data);
			if (request.status !== 200) {
				return false;
			}
			const access = request.data.access;
			if (access === null) {
				return false;
			}
			window.localStorage.setItem('access', access);
			return true;
		} catch (err) {
			console.error('Failde to Refresh Token!!');
			throw err;
		}
	}

	__tokenIsExpired() {
		if (typeof window === 'undefined') return false;
		const token = window.localStorage.getItem('access');
		if (token !== null) {
			const expiryTime = parseJwt(token).exp;
			return !(
				expiryTime !== null &&
				parseInt(expiryTime) >= parseInt(String(new Date().getTime() / 1000))
			);
		}
		return true;
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

type UrlKeys = keyof typeof url;

function get_url<K extends UrlKeys>(
	key: K,
	...params: Parameters<(typeof url)[K]>
): string {
	try {
		if (params) {
			if (Array.isArray(params)) return url[key](...params);
			return url[key](params);
		}
		return url[key]();
	} catch (e) {
		console.log(`Can't find any url with '${key}'`);
		return ''; // or throw an error or handle the error in another way
	}
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
				name: localStorage.getItem('name'),
				college_id: localStorage.getItem('id'),
				role: localStorage.getItem('role_name'),
				pk: parseJwt(access).user_id,
			};
		}
		return undefined;
	}
};

const extractError = (err: any) => {
	let rv = '';

	function rec(obj: any) {
		if (typeof obj === 'string') {
			if (rv === '') {
				rv = obj;
			} else {
				rv = ', ' + obj;
			}
		} else if (Array.isArray(obj)) {
			for (let i = 0; i < obj.length; i++) {
				rec(obj[i]);
			}
		} else if (typeof obj === 'object') {
			for (let field in obj) {
				rec(obj[field]);
			}
		}
	}
	rec(err);
	return rv;
};

const url: {[key: string]: (...args: any[]) => string} = {
	'login': () => {
		return 'user/token/';
	},
	'profile_detail': (id: string) => {
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
	'event:detail': (id: string) => {
		return `event/detail/${id}/`;
	},
	'event:club_branch': () => {
		return 'event/club/branch/';
	},
	'event:create': () => {
		return 'event/create/';
	},
	'event:update': (id: string) => {
		return `event/update/${id}/`;
	},
	'event:apply': (id: string) => {
		return `event/apply/${id}/`;
	},
	'event:update_application': (id: string) => {
		return `event/application_approval/${id}/`;
	},
	'event:participant_list': (id: string) => {
		return `event/participant_list/${id}/`;
	},
	'event:registered': () => {
		return 'event/registered/';
	},
	'event:completed': () => {
		return 'event/completed/';
	},
	'event:organizing': () => {
		return 'event/organizing/';
	},
	'event:pending': () => {
		return 'event/pending/';
	},
	'event:accept': (id: number) => {
		return `event/accept/${id}/`;
	},
	'event:reject': (id: number) => {
		return `event/deny/${id}/`;
	},
	'event:upload_report': (id: number) => {
		return `event/report/upload/${id}/`;
	},
	'event:delete': (id: number) => {
		return `event/delete/${id}/`;
	},
	'event:delete_report': (id: number) => {
		return `event/report/${id}/`;
	},
	'user:organizer': () => {
		return 'user/organizer/';
	},
	'user:send_otp': () => {
		return 'user/send_otp/';
	},
	'user:verify_otp': () => {
		return 'user/verify_otp/';
	},
	'user:reset_password': () => {
		return 'user/reset_password/';
	},
} as const;
const API: {[key: string]: any} = {
	Axios: AxiosInstance,
	jwt: parseJwt,
	get_url: get_url,
	is_logged_in: is_logged_in,
	get_user_detail: user_detail,
	extract_error: extractError,
};
export default API;
