import React from 'react';

export default function useEffect(effect: Function, deps: Array<any> | undefined) {
	const [isLoading, setIsLoading] = React.useState(true);
	const alreadyRan = React.useRef(false);
	React.useEffect(() => {
		setIsLoading(true);
		if (alreadyRan.current === false) {
			alreadyRan.current = true;
			let cleanup;
			(async () => {
				cleanup = await effect();
				setIsLoading(false);
			})();
			return cleanup;
		}
	}, deps);

	return [isLoading, setIsLoading];
}
