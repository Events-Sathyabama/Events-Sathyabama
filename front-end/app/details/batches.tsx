import Chip from '@mui/material/Chip';
import {useState} from 'react';

const BatchesComponent = () => {
	// TODO fetch batches in this way
	const batches = [
		'CSE 2021-2022',
		'IT 2024-2028',
		'IT 2020-2024',
		'IT 2020-2024',
		'IT 2020-2024',
		'IT 2020-2024',
		'IT 2020-2024',
		'IT 2020-2024',
		'IT 2020-2024',
	];

	// TODO fetch fcfs or manual
	const [isFcfs, setIsFcfs] = useState(true);
	return (
		<div className="flex flex-col items-center lg:items-start justify-center lg:justify-start flex-wrap gap-2 p-2 w-full lg:w-7/12">
			<Chip
				color="primary"
				variant="outlined"
				className="w-max"
				label={isFcfs ? 'First Come First Serve' : 'Manual Application Approval'}
				icon={
					isFcfs ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-4 h-4 pl-1">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-4 h-4 pl-1">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
							/>
						</svg>
					)
				}
			/>
			<div className="flex flex-row gap-1 justify-center lg:justify-start flex-wrap">
				{batches.map((batch, index) => (
					<Chip key={index} variant="filled" size="small" label={batch} />
				))}
			</div>
		</div>
	);
};

export default BatchesComponent;
