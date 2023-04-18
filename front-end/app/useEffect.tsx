import React from 'react';
import handleError from './handleError';

/* this will set the LoadingCode to 200 when the document is ready to use and JS has taken over */
const makeDocumentReady = (effectFinished: boolean, setLoadingCode: Function) => {
	React.useEffect(() => {
		if (!effectFinished) {
			return;
		}
		let codeUpdated = false;
		const interval = setTimeout(function run() {
			if (document.readyState === 'complete') {
				setTimeout(() => {
					setLoadingCode((prev: number) => (prev === 0 ? 200 : prev)); // success page ready
					codeUpdated = true;
				}, 400);
			} else {
				run();
			}
		}, 500);

		return () => {
			window.clearInterval(interval);
		};
	}, [effectFinished]);
};

const handleCallback = (
	callback: Function,
	setLoadingCode: React.Dispatch<React.SetStateAction<number>>,
	setEffectFinished: Function
) => {
	const isAsync = callback.constructor.name === 'AsyncFunction';
	let cleanup;
	if (isAsync) {
		callback()
			//@ts-expect-error
			.then((data) => {
				setEffectFinished(true);
				return data;
			})
			//@ts-expect-error
			.catch((err) => {
				handleError(err, setLoadingCode);
				setEffectFinished(true);
				throw err;
			});
	} else {
		try {
			cleanup = callback();
		} catch (err) {
			handleError(err, setLoadingCode);
			throw err;
		}
	}
	if (typeof cleanup === 'function') {
		return cleanup;
	}
};

const runOnceOrTwice = (runOnce: boolean, callback: Function, alreadyRan: any) => {
	if (runOnce) {
		if (alreadyRan.current === false) {
			alreadyRan.current = true;
			return callback();
		}
	} else {
		return callback();
	}
};

/* This can handle the Async callback function */
const useEffectAsync = (
	callback: Function,
	deps: Array<any> | undefined,
	setLoadingCode: React.Dispatch<React.SetStateAction<number>>,
	cleanup: void | (() => void),
	runOnce: boolean
) => {
	const [effectFinished, setEffectFinished] = React.useState(false);
	const alreadyRan = React.useRef(false);

	makeDocumentReady(effectFinished, setLoadingCode);

	const call = () => handleCallback(callback, setLoadingCode, setEffectFinished);

	React.useEffect(() => {
		setLoadingCode(0);
		runOnceOrTwice(runOnce, call, alreadyRan);
		return cleanup;
	}, deps);
};

/* This is a regular useEffect  */
const useEffectNormal = (
	callback: Function,
	deps: Array<any> | undefined,
	setLoadingCode: React.Dispatch<React.SetStateAction<number>>,
	runOnce: boolean
) => {
	const [effectFinished, setEffectFinished] = React.useState(false);
	const alreadyRan = React.useRef(false);

	makeDocumentReady(effectFinished, setLoadingCode);

	const call = () => handleCallback(callback, setLoadingCode, setEffectFinished);

	React.useEffect(() => {
		setLoadingCode(0);
		return runOnceOrTwice(runOnce, call, alreadyRan);
	}, deps);

	makeDocumentReady(effectFinished, setLoadingCode);
};

const useEffect = (
	callback: Function,
	deps: Array<any> | undefined,
	loadingCodeSetter?: React.Dispatch<React.SetStateAction<number>>,
	runOnce?: boolean,
	cleanup?: void | (() => void)
) => {
	let [loadingCode, setLoadingCode] = React.useState(0);
	const isAsync = callback.constructor.name === 'AsyncFunction';

	if (loadingCodeSetter !== undefined) setLoadingCode = loadingCodeSetter;

	if (runOnce === undefined) runOnce = false;

	if (runOnce && deps !== undefined && deps.length > 0)
		throw 'runOnce parameter can only be used with empty dependencies';
	if (cleanup && !isAsync)
		throw 'cleanup Parameter can only be used with async function';

	if (isAsync) {
		useEffectAsync(callback, deps, setLoadingCode, cleanup, runOnce);
	} else {
		useEffectNormal(callback, deps, setLoadingCode, runOnce);
	}

	return loadingCode;
};

export default useEffect;
