import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useRouter} from 'next/router';

interface RowProps {
	row: {
		eventName: string;
		applicationStatus: string;
		link: string;
	};
}

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
				className="hover:bg-gray-50"
				sx={{'& > *': {borderBottom: 'unset'}}}>
				<TableCell component="th" scope="row">
					{row.eventName}
				</TableCell>
				<TableCell>{row.applicationStatus}</TableCell>
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
							sx={{fontWeight: '700', fontSize: '1.5rem', lineHeight: '2rem'}}>
							Event Name
						</TableCell>
						<TableCell
							sx={{fontWeight: '700', fontSize: '1.5rem', lineHeight: '2rem'}}>
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
