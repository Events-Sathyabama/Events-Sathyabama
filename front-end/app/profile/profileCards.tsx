import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface ProfileCardProps {
	eventName: string;
	applicationStatus: 'Pending' | 'Accepted' | 'Rejected' | 'Completed' | 'Certified';
}

export default function ProfileCards(props: ProfileCardProps) {
	const theme = useTheme();

	return (
		<div className="flex border border-gray-300 rounded-md shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-300 w-full">
			<div className="flex flex-row justify-between w-full">
				<CardContent sx={{flex: '1 0 auto'}}>
					<Typography component="div" variant="h5">
						{props.eventName}
					</Typography>
					<Typography variant="subtitle1" color="text.secondary" component="div">
						Google Developers Student Club
					</Typography>
					<Typography component="div" variant="h6">
						<div className="flex flex-row gap-2 justify-start pl-2 items-center shadow-sm border w-36 py-2 rounded-md">
							{props.applicationStatus === 'Pending' ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 text-gray-700">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							) : null}
							{props.applicationStatus === 'Accepted' ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 text-blue-500">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 5.25 5.25 0 00-.1-.664m-5.8 0A2.251 5.251 0 0113.5 5.25H15c1.012 0 1.867.668 5.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 5.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 5.192V16.5A2.25 5.25 0 0118 18.75h-5.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
									/>
								</svg>
							) : null}
							{props.applicationStatus === 'Rejected' ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 text-red-500">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							) : null}
							{props.applicationStatus === 'Completed' ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 text-green-500">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							) : null}
							{props.applicationStatus === 'Certified' ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 text-orange-300">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
									/>
								</svg>
							) : null}
							<p>{props.applicationStatus}</p>
						</div>
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					sx={{width: 100}}
					image="/eventPosters/Madhugai.jpg"
					alt="Live from space album cover"
				/>
			</div>
		</div>
	);
}
