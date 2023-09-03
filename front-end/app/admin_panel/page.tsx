'use client';
import Button from '@mui/material/Button';
import Link from 'next/link';
import React from 'react';
import WebBackdrop from '../backdrop';
import Popup from '../popup';
import LineChart from './chart';
import ExcelUploader from './excelUploader';
import StatsCard from './statsCard';
import API from '../API';

const axios = new API.Axios();

interface DataPoint {
	x: string;
	y: number;
}

interface ChartData {
	id: string;
	color: string;
	data: DataPoint[];
}

export default function AdminPanel() {
	const [syncing, setSyncing] = React.useState(false);
	const [PopupMessage, setPopupMessage] = React.useState('');
	const [sPopup, setSPopup] = React.useState(false);
	const [fPopup, setFPopup] = React.useState(false);
	const [chartData, setChartData] = React.useState<ChartData[]>([]);
	const [organizedEvent, setOrganizedEvent] = React.useState(0);
	const [pendingEvent, setPendingEvent] = React.useState(0);
	const [RejectedEvent, setRejectedEvent] = React.useState(0);
	const [timeInterval, setTimeInterval] = React.useState('');
	const [djangoAdminPanel, setDjangoAdminPanel] = React.useState('#');

	React.useEffect(() => {
		const timer = setTimeout(async () => {
			const response = await axios.get(API.get_url('admin:report'));
			const data = response.data;
			const cData: DataPoint[] = [];
			for (let month in data.chart_data) {
				cData.push({x: month, y: data.chart_data[month]});
			}
			setChartData([
				{
					id: 'Monthly Freq',
					color: 'hsl(210, 97%, 53%)',
					data: cData,
				},
			]);
			setTimeInterval(data.time_interval);
			setOrganizedEvent(data.total_event);
			setPendingEvent(data.pending_count);
			setRejectedEvent(data.rejected_count);
			setDjangoAdminPanel(data.django_admin_panel_url);
			console.log(response);
		}, 1);
		return () => {
			clearTimeout(timer);
		};
	}, []);

	async function handleSync() {
		setSyncing(true);
		try {
			const response = await axios.get(API.get_url('admin:sync_user'));
			setPopupMessage("Users' Sync Successful!");
			setSPopup(true);
		} catch (error: any) {
			console.error(error);
			setPopupMessage(error.response?.data?.detail || 'Something Went Wrong');
			setFPopup(true);
		}

		setSyncing(false);
	}

	return (
		<div className="flex flex-col w-full justify-center items-center">
			{syncing && (
				<WebBackdrop message="Syncing Users, this may take a while, please be patient..." />
			)}
			{sPopup && <Popup.Success message={PopupMessage} showpopup={setSPopup} />}
			{fPopup && <Popup.Error message={PopupMessage} showpopup={setFPopup} />}
			<div className="flex flex-col w-11/12 items-center my-5 gap-5">
				<h1 className="text-2xl text-center animateFadeIn">EMS Admin Panel</h1>
				<div className="h-96 w-full sm:p-3 sm:border sm:border-gray-300 sm:rounded-md">
					<LineChart data={chartData} />
				</div>
				<div className="flex flex-row w-full flex-grow justify-center items-center gap-4 flex-wrap sm:bg-blue-50 sm:border sm:border-blue-300 sm:py-6 sm:rounded-md">
					<StatsCard
						statCount={organizedEvent}
						statDescription={'Organised Events'}
						statPeriod={timeInterval}
					/>
					<StatsCard
						statCount={pendingEvent}
						statDescription={'Pending Events'}
						statPeriod={timeInterval}
					/>
					<StatsCard
						statCount={RejectedEvent}
						statDescription={'Rejected Events'}
						statPeriod={timeInterval}
					/>
				</div>
				<div className="flex flex-col w-full p-5 border border-gray-300 rounded-md">
					<p className="text-2xl">Django Admin Panel</p>
					<p>
						Access all information regarding events, clubs, branches, and users
						(students, teachers, HODs, Deans, and VC) here. You are advised to use
						this panel with utmost care.
					</p>
					<Link href={djangoAdminPanel}>
						<Button
							size="medium"
							type="submit"
							variant="outlined"
							style={{
								textTransform: 'none',
								marginTop: '1rem',
							}}
							color="primary"
							className="font-roboto shadow-md w-72">
							OPEN ADMIN PANEL
						</Button>
					</Link>
				</div>
				<div className="flex flex-col w-full items-center">
					<ExcelUploader eventId="1" />
					<p className="mt-2">(or)</p>
					<Button
						size="medium"
						type="submit"
						variant="outlined"
						onClick={() => handleSync()}
						style={{
							textTransform: 'none',
							marginTop: '1rem',
						}}
						color="primary"
						className="font-roboto shadow-md w-72">
						CLICK TO SYNC USERS
					</Button>
				</div>
			</div>
		</div>
	);
}
