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
}

function createData(
	name: string,
	branch: string,
	register_number: number,
	batch: string
): Data {
	return {name, branch, register_number, batch};
}

const jsonData = [
	{
		name: 'Abhishek Manikandan',
		branch: 'BE CSE',
		register_number: 40110017,
		batch: '2020-2024',
	},
	{
		name: 'Rohit Challa',
		branch: 'BE CSE',
		register_number: 40110017,
		batch: '2020-2023',
	},
	{
		name: 'Bandepalli Surya Anjani Kumar',
		branch: 'BE CSE',
		register_number: 40110156,
		batch: '2020-2024',
	},
	{name: 'Adithya', branch: 'BE CSE', register_number: 40110127, batch: '1992-1994'},
	// TODO Fetch data in this format
];

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
		//TODO download excel file here bro
	}
	const [loader, setLoader] = React.useState(0);
	const [pageNo, setPageNo] = React.useState(1);
	useEffect(
		async () => {
			const response = await axios.get(
				API.get_url('event:participant_list', props.params.id)
			);
			console.log(response.data);
			setRows(response.data);
		},
		[pageNo],
		setLoader
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
				<Button
					variant="outlined"
					className="bg-white hover:bg-white sm:mr-3"
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
					Download Excel(.xlsx) File
				</Button>
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
