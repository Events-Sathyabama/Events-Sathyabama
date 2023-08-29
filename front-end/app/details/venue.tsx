export default function EventTime(props: {
	dates: string | undefined;
	time: string | undefined;
	venue: string | undefined;
}) {
	return (
		<div className="relative w-full p-3 border border-gray-300 rounded-md">
			<div className="absolute -z-10 top-0 left-0 w-full h-full filter blur-md" />
			<div className="flex flex-col ml-10 pt-4 border border-y-0 border-r-0 border-gray-700">
				<ol className="flex flex-col -ml-11 gap-3 w-full">
					<li className="flex flex-col w-full ml-6 gap-1">
						<div className="flex flex-row h-full items-center gap-4">
							<div className="flex items-center justify-center border w-10 h-10 border-gray-400 bg-blue-100 rounded-full ring-8 ring-gray-100 shrink-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1}
									stroke="currentColor"
									className="w-6 h-6">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
									/>
								</svg>
							</div>
						</div>
						<pre className="ml-14 -mt-11 p-2 border border-gray-300 rounded-md text-lg bg-gray-50 font-normal text-gray-800 mb-3 whitespace-pre-line font-roboto">
							{props.dates || 'Date TBD'}
						</pre>
					</li>
					<li className="flex flex-col w-full ml-6 gap-1">
						<div className="flex flex-row h-full items-center gap-4">
							<div className="flex items-center justify-center w-10 h-10 border border-gray-400 bg-blue-100 rounded-full ring-8 ring-gray-100 shrink-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1}
									stroke="currentColor"
									className="w-6 h-6">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
						</div>
						<pre className="ml-14 -mt-11 p-2 border border-gray-300 rounded-md text-lg font-normal text-gray-800 mb-3 whitespace-pre-line font-roboto">
							{props.time || 'Duration TBD'}
						</pre>
					</li>
					<li className="flex flex-col w-full ml-6 gap-1">
						<div className="flex flex-row h-full items-center gap-4">
							<div className="flex items-center justify-center w-10 h-10 border border-gray-400 bg-blue-100 rounded-full ring-8 ring-gray-100 shrink-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1}
									stroke="currentColor"
									className="w-6 h-6">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
									/>
								</svg>
							</div>
						</div>
						<pre className="ml-14 -mt-11 p-2 border border-gray-300 bg-gray-50 rounded-md text-lg font-normal text-gray-800 mb-3 whitespace-pre-line font-roboto">
							{props.venue || 'Venue TBD'}
						</pre>
					</li>
				</ol>
			</div>
		</div>
	);
}
