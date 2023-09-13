import LinearProgress from '@mui/material/LinearProgress';

interface Props {
	registeredStudents: number;
	totalCapacity: number;
}

export default function ProgressBar({registeredStudents, totalCapacity}: Props) {
	const progress = (registeredStudents / totalCapacity) * 100;

	return (
		<div className="flex flex-row justify-center items-center w-full lg:w-80 sm:gap-3 -mt-2 border bg-blue-50 border-blue-200 rounded-md p-2">
			<div className="flex flex-col justify-center items-center gap-1">
				<p className="flex justify-center items-end text-2xl truncate h-8 w-48">
					{registeredStudents}/{totalCapacity}{' '}
					<span className="text-sm text-gray-600 ml-1 mb-1">applicants</span>
				</p>
				<LinearProgress
					className="w-40 sm:w-48"
					color="primary"
					variant="determinate"
					value={progress}
				/>
			</div>
			<p className="text-3xl border border-blue-300 bg-white p-2 rounded-md mr-2 sm:mr-0">{`${Math.round(
				progress
			)}%`}</p>
		</div>
	);
}
