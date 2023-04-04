import React from 'react';
import handleError from './handleError';

export default function useEffect(
	effect: Function,
	deps: Array<any> | undefined,
	LoadingCode?: Function
) {
	const alreadyRan = React.useRef(false);
	const [effectFinished, setEffectFinished] = React.useState(false);

	/*
		0 Loading screen
		200 success (hide loading screen)
		404 Page not Found
		403 Forbidden
		500 Server Error
		600 Network Error

	*/
	let setLoadingCode: Function;
	let loadingCode: number = 200;
	if (LoadingCode) {
		setLoadingCode = LoadingCode;
	} else {
		[loadingCode, setLoadingCode] = React.useState(0);
	}

	React.useEffect(() => {
		const handlePromise = (promise: Promise<any>) => {
			promise
				.then(() => {
					setEffectFinished(true);
				})
				.catch((err: any) => {
					handleError(err, setLoadingCode);
					setEffectFinished(true);
				});
		};

		if ((Array.isArray(deps) && deps.length !== 0) || alreadyRan.current === false) {
			setLoadingCode(0); // loading screen
			alreadyRan.current = true;
			const cleanup = effect();

			if (Array.isArray(cleanup)) {
				for (let i = 0; i < cleanup.length; i++) {
					if (typeof cleanup[i] === 'function') {
						return cleanup[i];
					} else if (cleanup instanceof Promise) {
						handlePromise(cleanup[i]);
					}
				}
			} else if (typeof cleanup === 'function') {
				setEffectFinished(true);
				return cleanup;
			} else if (cleanup instanceof Promise) {
				handlePromise(cleanup);
			}
		}
	}, deps);

	React.useEffect(() => {
		if (!effectFinished) {
			return;
		}
		setTimeout(function run() {
			if (document.readyState === 'complete') {
				setTimeout(() => {
					setLoadingCode((prev: number) => (prev === 0 ? 200 : prev)); // success page ready
				}, 400);
			} else {
				run();
			}
		}, 500);
	}, [effectFinished]);

	return loadingCode;
}
