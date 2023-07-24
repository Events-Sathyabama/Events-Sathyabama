'use client';
import * as React from 'react';
import {Button, IconButton} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import useEffect from '@/app/useEffect';
import API from '@/app/API';

const axios = new API.Axios();

interface Column {
	id: 'name' | 'register_number' | 'branch' | 'batch';
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
];

interface Data {
	name: string;
	branch: string;
	register_number: number;
	batch: string;
	event_name: string;
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
		const exportData = [['Register Number', 'Name', 'Batch', 'Branch']];
		rows.forEach((val) => {
			exportData.push([
				String(val.register_number),
				val.name,
				val.batch,
				val.branch,
			]);
		});
		exportToCsv(exportData, rows[0].event_name);
	}
	const [loader, setLoader] = React.useState(0);
	useEffect(
		async () => {
			const response = await axios.get(
				API.get_url('event:participant_list', props.params.id)
			);
			console.log(response.data);
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
					<IconButton href="/details/11">
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
						Accepted Applicants
					</p>
				</div>
				{rows.length > 0 && (
					<Button
						variant="outlined"
						className="bg-white hover:bg-white sm:mr-3"
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
			<TableContainer className="mb-16 px-5">
				<Table
					stickyHeader
					aria-label="sticky table"
					className="border border-gray-300 mt-4 rounded-sm">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									className="text-lg text-white bg-[#1976d2]"
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
													{value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				className="fixed bottom-0 right-0 bg-white w-full border border-t-2 border-blue-300"
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</div>
	);
}