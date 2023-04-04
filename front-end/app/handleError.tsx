export default function handleError(err: any, setLoader: Function) {
	console.error(err);
	if (err.message === 'Network Error') {
		setLoader(600);
	} else if (err.response) {
		if (err.response.status) {
			setLoader(err.response.status);
		} else {
			setLoader(999);
		}
	} else {
		setLoader(999);
	}
}
