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
	{eventName: 'Event 5', applicationStatus: 'Completed', link: '/details/2'},
	{
		eventName: 'Event 5',
		applicationStatus: 'Certified',
		link: '/details/2',
	},
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
				<TableCell
					component="th"
					scope="row"
					sx={{fontSize: '1.25rem', lineHeight: '1.75rem'}}>
					{row.eventName}
				</TableCell>
				<TableCell
					className="border-l-2 border-l-gray-50"
					sx={{fontSize: '1.25rem', lineHeight: '1.75rem'}}>
					<div className="flex flex-row gap-2 items-center">
						{row.applicationStatus === 'Pending' ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5 text-gray-700">
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
								className="w-5 h-5 text-blue-500">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 5.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
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
								className="w-5 h-5 text-red-500">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						) : null}
						{row.applicationStatus === 'Completed' ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5 text-green-500">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						) : null}
						{row.applicationStatus === 'Certified' ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5 text-orange-300">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
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

export default function TableEvents(props: {passer: string}) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow className="w-full">
						<TableCell
							sx={{fontWeight: '700', fontSize: '1.25rem', lineHeight: '1.5rem'}}
							className="bg-blue-50 border-r-2 border-gray-50 w-2/3">
							Event Name
						</TableCell>
						<TableCell
							sx={{fontWeight: '700', fontSize: '1.25rem', lineHeight: '1.5rem'}}
							className="bg-blue-50 w-1/3">
							{props.passer === '1' ? <>Application Status</> : <>Event Status</>}
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
