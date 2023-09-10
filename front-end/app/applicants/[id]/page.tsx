'use client';
import API from '@/app/API';
import CircularLoader from '@/app/circularLoader';
import useEffect from '@/app/useEffect';
import {Button, IconButton} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

const axios = new API.Axios();

interface Column {
	id: 'name' | 'register_number' | 'branch' | 'batch' | 'certificate';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{id: 'name', label: 'Name', minWidth: 130},
	{
		id: 'register_number',
		label: 'Register Number',
		minWidth: 100,
		format: (value: number) => value.toLocaleString('en-US'),
	},
	{
		id: 'batch',
		label: 'Batch',
		minWidth: 110,
		format: (value: number) => value.toLocaleString('en-US'),
	},
	{id: 'branch', label: 'Branch', minWidth: 80},
	{id: 'certificate', label: 'Certificate', minWidth: 80},
];

interface Data {
	name: string;
	branch: string;
	register_number: number;
	batch: string;
	event_name: string;
	certificate: string | undefined;
}

const exportToCsv = function (data: string[][], file_name: string) {
	var CsvString = '';
	data.forEach(function (RowItem, RowIndex) {
		RowItem.forEach(function (ColItem, ColIndex) {
			CsvString += ColItem + ',';
		});
		CsvString += '\r\n';
	});
	CsvString = 'data:application/csv,' + encodeURIComponent(CsvString);
	var x = document.createElement('A');
	x.setAttribute('href', CsvString);
	x.setAttribute('download', `${file_name}.csv`);
	document.body.appendChild(x);
	x.click();
};

export default function Applicants(props: {params: {id: number}}) {
	const [rows, setRows] = React.useState<Data[]>([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	function handleDownload() {
		if (rows.length === 0) {
			return;
		}
		const exportData = [
			['Register Number', 'Name', 'Batch', 'Branch', 'Certificate'],
		];
		rows.forEach((val) => {
			exportData.push([
				String(val.register_number),
				val.name,
				val.batch,
				val.branch,
				val.certificate || '',
			]);
		});
		const file_name = rows[0].event_name.split(' ').join('_') + '(Participant_List)';
		exportToCsv(exportData, file_name);
	}

	const [loader, setLoader] = React.useState(0);

	const [backUrl, setBackUrl] = React.useState('');
	const [eventName, setEventName] = React.useState('');

	useEffect(() => {
		const currentURL = window.location.href;
		const parts = currentURL.split('/');
		const lastPart = parts[parts.length - 1];
		setBackUrl('/details/' + lastPart.toString());
	}, []);

	useEffect(
		async () => {
			const response = await axios.get(
				API.get_url('event:participant_list', props.params.id)
			);
			console.log('Data got: ' + response.data);
			if (response.data.length > 0) {
				setEventName(response.data[0].event_name);
				document.title =
					response.data[0].event_name + ' - Accepted Applicants | Events@Sathyabama';
			}
			setRows(response.data);
		},
		[],
		setLoader,
		true
	);
	return (
		<div className="flex flex-col w-full items-center">
			<div className="flex flex-col gap-2 sm:flex-row sm:justify-between py-3 items-center w-full bg-[#1976d2]">
				<div className="flex flex-row justify-center items-center ml-6">
					<IconButton href={backUrl}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8 p-1 text-white">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
							/>
						</svg>
					</IconButton>
					<p className="text-2xl ml-1 text-white pr-10 sm:pr-0">
						Accepted Applicants {eventName !== '' ? `(${eventName})` : ''}
					</p>
				</div>
				{rows.length > 0 && (
					<Button
						sx={{color: 'white', marginRight: '1rem'}}
						onClick={handleDownload}
						startIcon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
								/>
							</svg>
						}>
						Download CSV File
					</Button>
				)}
			</div>
			{loader ? (
				rows.length > 0 ? (
					<TableContainer className="mb-16 px-5">
						<Table
							stickyHeader
							aria-label="sticky table"
							className="border border-gray-300 mt-4 rounded-sm">
							<TableHead>
								<TableRow>
									{columns.map((column) => (
										<TableCell
											sx={{
												backgroundColor: '#1976d2',
												fontSize: '1.125rem',
												lineHeight: '1.75rem',
												color: 'white',
											}}
											key={column.id}
											align={column.align}
											style={{minWidth: column.minWidth}}>
											{column.label}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{rows
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row) => {
										return (
											<TableRow
												hover
												role="checkbox"
												tabIndex={-1}
												key={row.register_number}>
												{columns.map((column) => {
													const value = row[column.id];
													return (
														<TableCell key={column.id} align={column.align}>
															{column.id === 'certificate' ? (
																<>
																	{value !== null ? (
																		<a
																			href={String(value)}
																			target="__blank"
																			className="!text-blue-800 underline">
																			View Certificate
																		</a>
																	) : (
																		'Not Issued'
																	)}
																</>
															) : (
																value
															)}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					<div className="text-center text-xl mt-4">No accepted applicants!</div>
				)
			) : (
				<CircularLoader remainingHeight="70vh" remainingWidth="" />
			)}
			{rows.length > 0 && (
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={rows.length}
					className="fixed bottom-0 right-0"
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			)}
		</div>
	);
}
