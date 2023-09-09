((undefined) => {
	debugger;
	const backDrop = document.getElementById('global-backdrop');
	if (backDrop === undefined || backDrop === null) {
		return;
	}
	function parseJwt(token) {
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

	const is_logged_in = () => {
		if (typeof window === 'undefined') {
			return false;
		}
		const access = parseJwt(window.localStorage.getItem('access') || '');
		if (access === null) {
			return false;
		}
		const refresh = parseJwt(window.localStorage.getItem('refresh') || '');
		if (refresh === null) {
			return false;
		}
		return parseInt(refresh.exp) >= parseInt(String(new Date().getTime() / 1000));
	};
	if (is_logged_in()) {
		if (window.location.pathname === '/') {
			window.location.href = '/home/upcoming';
		} else {
			backDrop.style.display = 'none';
		}
	} else {
		if (window.location.pathname !== '/') {
			window.location.href = '/';
		} else {
			backDrop.style.display = 'none';
		}
	}
})();
