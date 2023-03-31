import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';

interface Props {
	registeredStudents: number;
	totalCapacity: number;
}

export default function ProgressBar({registeredStudents, totalCapacity}: Props) {
	const progress = (registeredStudents / totalCapacity) * 100;

	return (
		<div className="flex flex-row justify-center items-center gap-3 w-11/12 -mt-2">
			<LinearProgress
				className="w-10/12"
				color="primary"
				variant="determinate"
				value={progress}
			/>
			<p className="w-2/12 text-3xl font-serif">{`${Math.round(progress)}%`}</p>
		</div>
	);
}
