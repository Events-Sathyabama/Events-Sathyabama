import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';

interface RowProps {
	row: {
		eventName: string;
		applicationStatus: string;
		link: string;
	};
}

// TODO fetch the application status of students in this way
const rows = [
	{
		eventName: 'Madhugai - The Strength',
		applicationStatus: 'Pending',
		link: '/details/2',
	},
	{eventName: 'Testing Event 2', applicationStatus: 'Rejected', link: '/details/2'},
	{eventName: 'Event 3', applicationStatus: 'Accepted', link: '/details/2'},
	{eventName: 'Event 4', applicationStatus: 'Pending', link: '/details/2'},
];

function Row(props: RowProps) {
	const {row} = props;
	const [open, setOpen] = React.useState(false);

	return (
		<React.Fragment>
			<TableRow
				component={Link}
				href={row.link}
				className="hover:bg-gray-50"
				sx={{'& > *': {borderBottom: 'unset'}}}>
				<TableCell component="th" scope="row" className="text-lg">
					{row.eventName}
				</TableCell>
				<TableCell className="text-lg border-l-2 border-l-gray-50">
					<div className="flex flex-row gap-2 items-center">
						{row.applicationStatus === 'Pending' ? (
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
									d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						) : null}
						{row.applicationStatus === 'Accepted' ? (
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
						{row.applicationStatus === 'Rejected' ? (
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
						<p>{row.applicationStatus}</p>
					</div>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

export default function TableEvents() {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell
							sx={{fontWeight: '700', fontSize: '1.5rem', lineHeight: '2rem'}}
							className="bg-blue-50 border-r-2 border-gray-50">
							Event Name
						</TableCell>
						<TableCell
							sx={{fontWeight: '700', fontSize: '1.5rem', lineHeight: '2rem'}}
							className="bg-blue-50">
							Application Status
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<Row key={row.eventName} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
