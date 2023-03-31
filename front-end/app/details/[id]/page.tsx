'use client';
import Header from '../header';
import Poster from '../poster';
import Tabs from '../tabs';
import {useEffect, useState} from 'react';
import API from '../../API';
import Popup from '../../popup';
import EventTime from '../venue';
import Fab from '@mui/material/Fab';
import Link from 'next/link';
import LoadingButton from '@mui/lab/LoadingButton';
import ProgressBar from '../progressBar';

const axios = new API.Axios();

export default function details(props: {params: {id: number}}) {
	const [Spopup, setSpopup] = useState(false);
	const [Fpopup, setFpopup] = useState(false);

	function showSuccessPopup() {
		setSpopup(true);
	}

	function showFailurePopup() {
		setFpopup(true);
	}

	const [data, setData] = useState({
		title: null,
		pk: null,
		club: null,
		date: null,
		time: null,
		venue: null,
		long_description: null,
		short_description: null,
		organizer: [],
		image: null,
	});

	useEffect(() => {
		(async () => {
			const request = await axios.get(
				API.get_url('event:detail', [props.params.id])
			);
			if (request.status == 200) {
				setData(request.data);
			}
		})();
	}, []);

	const [loading, setLoading] = useState(false);

	function handleClick() {
		setLoading(true);
		setCalledByApply(true);
		//if success
		setTimeout(() => {
			setApplied(true);
			setSpopup(true);
		}, 4000);

		//if failure
		// setTimeout(() => {
		// 	setFpopup(true);
		// 	setLoading(false);
		// }, 4000);
	}
	const [calledByApply, setCalledByApply] = useState(false);
	const [applied, setApplied] = useState(false);

	return (
		<div className="flex flex-col w-full h-auto items-center justify-center">
			<div className="flex flex-col w-full items-end">
				{Spopup ? (
					<Popup.Success
						showpopup={setSpopup}
						message={
							calledByApply
								? 'Event Application Successful!'
								: 'Applications updated!'
						}></Popup.Success>
				) : null}
				{Fpopup ? (
					<Popup.Error
						showpopup={setFpopup}
						message={
							calledByApply
								? 'Event Application Unsuccessful, try again!'
								: 'Applications not updated!'
						}></Popup.Error>
				) : null}
			</div>
			<div className="flex flex-col w-11/12 h-auto">
				<Header
					club={data.club}
					short_desc={data.short_description}
					title={data.title}
				/>
				<div className="flex flex-col md:flex-row w-full h-auto mt-2 items-center gap-3 md:items-start justify-center">
					<Poster image={data.image} />
					<div className="flex flex-col w-full justify-center items-center mt-2 gap-3">
						<div className="flex flex-col items-start bg-blue-50 w-full p-4 rounded-lg gap-3">
							<div className="flex flex-row items-center gap-3">
								<div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shrink-0">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-8 h-8">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
										/>
									</svg>
								</div>
								<div className="flex flex-col">
									<p className="text-2xl text-black font-medium">
										Application Counts:
									</p>
									<p className="text-2xl text-black font-light">100/190</p>
								</div>
							</div>
							<ProgressBar registeredStudents={100} totalCapacity={190}></ProgressBar>
							{applied ? (
								<p className="w-full border border-green-500 p-2 rounded-md text-center shadow-lg text-white bg-green-600 transition-all duration-1000">
									APPLIED
								</p>
							) : (
								<LoadingButton
									loadingIndicator="Applying…"
									variant="contained"
									className="w-full"
									onClick={handleClick}
									loading={loading}
									size="large"
									style={!loading ? {backgroundColor: '#1565c0'} : {}}>
									<span>Apply for Event</span>
								</LoadingButton>
							)}
						</div>
						<EventTime
							dates={data.date}
							venue={data.venue}
							time={data.time}></EventTime>
						<Tabs
							long_desc={data.long_description}
							coordinator={data.organizer}
							showSuccessPopup={showSuccessPopup}
							showFailurePopup={showFailurePopup}
						/>
					</div>
					<Link href={`/event/update/${props.params.id}`}>
						<Fab
							color="primary"
							aria-label="edit"
							sx={{
								position: 'fixed',
								right: '1.5rem',
								bottom: '1.5rem',
								height: '4rem',
								width: '4rem',
							}}
							style={{backgroundColor: '#1565c0'}}>
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
									d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
								/>
							</svg>
						</Fab>
					</Link>
				</div>
			</div>
		</div>
	);
}
