import CircularLoader from '../circularLoader';

export function CardsLoader() {
	return (
		<div className="flex flex-row justify-center items-center w-full gap-1">
			<p className="text-xl text-gray-500">
				Just a moment...
			</p>
			<div className="scale-50">
				<CircularLoader remainingHeight="10vh" remainingWidth=""></CircularLoader>
			</div>
		</div>
	);
}
