'use client';
import Link from 'next/link';
import LineChart from './chart';
import StatsCard from './statsCard';
import Button from '@mui/material/Button';
import ExcelUploader from './excelUploader';
import React from 'react';
import WebBackdrop from '../backdrop';
import Popup from '../popup';

interface DataPoint {
	x: string;
	y: number;
}

interface ChartData {
	id: string;
	color: string;
	data: DataPoint[];
}

const dummyData: ChartData[] = [
	{
		id: 'Monthly Freq',
		color: 'hsl(210, 97%, 53%)',
		data: [
			// TODO always send the last 12 months
			// now we are in august so send from last sept
			// if we are in sept send from last oct like that
			{x: 'Sept', y: 5},
			{x: 'Oct', y: 12},
			{x: 'Nov', y: 1},
			{x: 'Dec', y: 12},
			{x: 'Jan', y: 0},
			{x: 'Feb', y: 10},
			{x: 'Mar', y: 2},
			{x: 'Apr', y: 7},
			{x: 'May', y: 14},
			{x: 'Jun', y: 9},
			{x: 'Jul', y: 5},
			{x: 'Aug', y: 1},
		],
	},
];

export default function AdminPanel() {
	const [syncing, setSyncing] = React.useState(false);
	const [sPopupMessage, setSPopupMessage] = React.useState('');
	const [sPopup, setSPopup] = React.useState(false);

	function handleSync() {
		// TODO axios call to sync users db
		setSyncing(true);
		setTimeout(() => {
			setSyncing(false);
			setSPopupMessage("Users' Sync Successful!");
			setSPopup(true);
		}, 5000);
	}

	return (
		<div className="flex flex-col w-full justify-center items-center">
			{syncing && (
				<WebBackdrop message="Syncing Users, this may take a while, please be patient..."></WebBackdrop>
			)}
			{sPopup && (
				<Popup.Success message={sPopupMessage} showpopup={setSPopup}></Popup.Success>
			)}
			<div className="flex flex-col w-11/12 items-center my-5 gap-5">
				<h1 className="text-2xl text-center animateFadeIn">EMS Admin Panel</h1>
				<div className="h-96 w-full sm:p-3 sm:border sm:border-gray-300 sm:rounded-md">
					<LineChart data={dummyData}></LineChart>
				</div>
				<div className="flex flex-row w-full flex-grow justify-center items-center gap-4 flex-wrap sm:bg-blue-50 sm:border sm:border-blue-300 sm:py-6 sm:rounded-md">
					<StatsCard
						statCount={42}
						statDescription={'Organised Events'}
						statPeriod={"Sept'22 - Aug '23"}></StatsCard>
					<StatsCard
						statCount={1}
						statDescription={'Pending Events'}
						statPeriod={"Sept'22 - Aug '23"}></StatsCard>
					<StatsCard
						statCount={12}
						statDescription={'Rejected Events'}
						statPeriod={"Sept'22 - Aug '23"}></StatsCard>
					<StatsCard
						statCount={5}
						statDescription={'Cancelled Events'}
						statPeriod={"Sept'22 - Aug '23"}></StatsCard>
				</div>
				<div className="flex flex-col w-full p-5 border border-gray-300 rounded-md">
					<p className="text-2xl">Django Admin Panel</p>
					<p>
						Access all information regarding events, clubs, branches, and users
						(students, teachers, HODs, Deans, and VC) here. You are advised to use
						this panel with utmost care.
					</p>
					<Link href={'http://localhost:8000/admin'}>
						<Button
							size="medium"
							type="submit"
							variant="outlined"
							style={{
								textTransform: 'none',
							}}
							color="primary"
							className="font-roboto shadow-md w-72 mt-4">
							OPEN ADMIN PANEL
						</Button>
					</Link>
				</div>
				<div className="flex flex-col w-full items-center">
					<ExcelUploader eventId="1"></ExcelUploader>
					<p className="mt-2">(or)</p>
					<Button
						size="medium"
						type="submit"
						variant="outlined"
						onClick={() => handleSync()}
						style={{
							textTransform: 'none',
						}}
						color="primary"
						className="font-roboto shadow-md w-72 mt-4">
						CLICK TO SYNC USERS
					</Button>
				</div>
			</div>
		</div>
	);
}
