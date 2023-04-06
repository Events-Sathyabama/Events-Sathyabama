'use client';
import Header from '../header';
import Poster from '../poster';
import Tabs from '../tabs';
import {useState} from 'react';
import useEffect from '../../useEffect';
import API from '../../API';
import Popup from '../../popup';
import EventTime from '../venue';
import Fab from '@mui/material/Fab';
import Link from 'next/link';
import LoadingButton from '@mui/lab/LoadingButton';
import ProgressBar from '../progressBar';
import {InterfaceData, InterfaceOrganizer} from '@/app/event/datainterface';
import ApiLoader from '../../apiLoader';
import handleError from '@/app/handleError';

const axios = new API.Axios();

const isUserFound = (
	user: InterfaceOrganizer,
	participant: InterfaceOrganizer[]
) => {
	console.log('isUserFound', user, participant);
	for (let i = 0; i < participant.length; i++) {
		if (participant[i].pk === user.pk) {
			console.log('True');
			return true;
		}
	}
	return false;
};

export default function details(props: {params: {id: number}}) {
	const [Spopup, setSpopup] = useState(false);
	const [Fpopup, setFpopup] = useState(false);
	const [popupMessage, setPopupMessage] = useState('');
	const [appliedCount, setAppliedCount] = useState(0);
	const [totalStrenth, setTotalStrenth] = useState(0);
	const [isApplied, setIsApplied] = useState(false);
	const [isOrganizer, setIsOrganizer] = useState(false);
	const [calledByApply, setCalledByApply] = useState(false);

	const [applying, setApplying] = useState(false);

	const [data, setData] = useState<InterfaceData>();
	const [Loader, setLoader] = useState(0);
	const runOnce = true; // makes this useEffect only run once
	useEffect(
		async () => {
		window.scrollTo(0, 0);
      
			const request = await axios.get(
				API.get_url('event:detail', [props.params.id])
			);
			const data = request.data;
			if (request.status !== 200) {
				setLoader(request.status);
				return;
			}
			if (!data.hasOwnProperty('is_applied')) {
				setIsOrganizer(true);
			} else {
				setIsApplied(data.is_applied);

			}

			setAppliedCount(data.applied_count);
			setTotalStrenth(data.total_strength);

			setData(data);
		},
		[],
		setLoader,
		runOnce
	);

	async function applyToEvent() {
		setApplying(true);
    setCalledByApply(true);
		try {
			const response = await axios.get(API.get_url('event:apply', props.params.id));
			console.log(response);
			setPopupMessage(response.data.message);
			setSpopup(true);
			setAppliedCount((prev) => prev + 1);
			setIsApplied(true);
		} catch (err: any) {
			console.log(err);
			if (err.response) {
				if (err.response.data.message !== undefined) {
					setPopupMessage(err.response.data.message);
				} else {
					setPopupMessage('Something went Wrong!!');
				}
			} else {
				setPopupMessage(err.message);
			}
			setFpopup(true);
			handleError(err, setLoader);
		}
		setApplying(false);
	}

	return (
		<>
			{<ApiLoader state={Loader} message="Fetching Data..." />}
			<div className="flex flex-col w-full h-auto items-center justify-center">
				<div className="flex flex-col w-full items-end">
					{Spopup ? (
					<Popup.Success
						showpopup={setSpopup}
						message={
							calledByApply
								? popupMessage
								: 'Applications updated!'
						}></Popup.Success>
				) : null}
				{Fpopup ? (
					<Popup.Error
						showpopup={setFpopup}
						message={
							calledByApply
								? popupMessage
								: 'Applications not updated!'
						}></Popup.Error>
				) : null}
				</div>
				<div className="flex flex-col w-11/12 h-auto">
					<Header
						club={data?.club?.name}

						short_desc={data?.short_description}
						title={data?.title}
					/>
					<div className="flex flex-col md:flex-row w-full h-auto mt-2 items-center gap-3 md:items-start justify-center">
						<Poster image={data?.image} />
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
											Head Count:
										</p>
										<p className="text-2xl text-black font-light">
											{totalStrenth === 0
												? 'Total Strength have not been set yet'
												: `${appliedCount}/${totalStrenth}`}
										</p>
									</div>
								</div>
								<ProgressBar
									registeredStudents={appliedCount || 0}
									totalCapacity={totalStrenth || 1}></ProgressBar>
								{!isOrganizer ? (
									<>
										{isApplied ? (
											<p className="w-full border border-green-500 p-2 rounded-md text-center shadow-lg text-white bg-green-600 transition-all duration-1000">
												APPLIED
											</p>
										) : (
											<LoadingButton
												loadingIndicator="Applying…"
												variant="contained"
												className="w-full"
												onClick={applyToEvent}
												loading={applying}
												size="large"
												style={!applying ? {backgroundColor: '#1565c0'} : {}}>
												<span>Apply for Event</span>
											</LoadingButton>
										)}
									</>
								) : (
									<></>

								)}
							</div>
							<EventTime
								dates={data?.date}
								venue={data?.venue}
								time={data?.time}></EventTime>
							<Tabs
								long_desc={data?.long_description}
								coordinator={(() => {
									const rv = [];
									if (data !== undefined) {
										rv.push(...data.organizer);
										rv.push(data.owner);
									}
									return rv;
								})()}
								showSuccessPopup={() => setSpopup(true)}
								showFailurePopup={() => setFpopup(true)}
								isOrganizer={isOrganizer}
								appliedParticipant={data?.applied_participant || []}
								acceptedParticipant={data?.accepted_participant || []}
							/>
						</div>
						{isOrganizer ? (
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
									style={{backgroundColor: '#1565c0', zIndex: 10}}>
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
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
