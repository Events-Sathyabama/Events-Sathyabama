'use client';
import Header from '../header';
import Poster from '../poster';
import {useState} from 'react';
import useEffect from '../../useEffect';
import API from '../../API';
import Popup from '../../popup';
import {Button} from '@mui/material';
import EventTime from '../venue';
import Fab from '@mui/material/Fab';
import LoadingButton from '@mui/lab/LoadingButton';
import ProgressBar from '../progressBar';
import {InterfaceData} from '@/app/datainterface';
import handleError from '@/app/handleError';
import Description from '../description';
import Coordinators from '../coordinators';
import Alert from '@mui/material/Alert';
import BatchesComponent from '../batches';
import ConfirmDialog from '../dialog';
import Acceptance from '../organiserAccept';
import AdminDialog from '../adminDialog';
import CircularLoader from '@/app/circularLoader';
import {useRouter} from 'next/router';
import ViewReport from '../viewReport';

const axios = new API.Axios();

const DisplayApprovalTab = (Data: InterfaceData | undefined) => {
	if (Data === undefined) {
		return false;
	}
	const dean = Data.dean_verified;
	const hod = Data.hod_verified;
	const vc = Data.vc_verified;
	if (dean === undefined) {
		return false;
	}
	const user_detail = API.get_user_detail();
	if (user_detail.role.toLowerCase() === 'hod' && hod === false) {
		return true;
	} else if (user_detail.role.toLowerCase() === 'dean' && dean === false) {
		return true;
	} else if (user_detail.role.toLowerCase() === 'vice-chancellor' && vc === false) {
		return true;
	}
	return false;
};

const isAuthority = () => {
	const user_detail = API.get_user_detail();
	if (user_detail.role.toLowerCase() === 'hod') {
		return true;
	} else if (user_detail.role.toLowerCase() === 'dean') {
		return true;
	} else if (user_detail.role.toLowerCase() === 'vice-chancellor') {
		return true;
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
	const [isAccepted, setIsAccepted] = useState(false);
	const [isDeclined, setIsDeclined] = useState(false);
	const [isOrganizer, setIsOrganizer] = useState(false);

	const [applying, setApplying] = useState(false);

	const [data, setData] = useState<InterfaceData>();
	const [Loader, setLoader] = useState(0);
	const [isCompleted, setCompleted] = useState(false);
	const runOnce = true; // makes this useEffect only run once
	useEffect(
		async () => {
			const response = await axios.get(
				API.get_url('event:detail', [props.params.id])
			);
			const data = response.data;
			console.log(data);
			if (response.status !== 200) {
				setLoader(response.status);
				return;
			}
			if (!data.hasOwnProperty('is_applied')) {
				setIsOrganizer(true);
			} else {
				setIsAccepted(data.is_accepted);
				setIsApplied(data.is_applied);
				setIsDeclined(data.is_declined);
			}

			const endDate = new Date(data.end_date);
			const currentDate = new Date();
			setCompleted(endDate.getTime() <= currentDate.getTime());
			setAppliedCount(data.applied_count);
			setTotalStrenth(data.total_strength);

			setData(data);
			document.getElementsByTagName('title')[0].innerHTML =
				data.title + ' | Events@Sathyabama';
			console.log(data);
		},
		[],
		setLoader,
		runOnce
	);

	async function applyToEvent() {
		setApplying(true);
		try {
			console.log(API.get_url('event:apply', props.params.id));
			const response = await axios.get(API.get_url('event:apply', props.params.id));
			console.log(response);
			setPopupMessage(response.data.message);
			setSpopup(true);
			if (data?.fcfs) {
				setAppliedCount((prev) => prev + 1);
				setIsAccepted(true);
			}
			setIsApplied(true);
		} catch (err: any) {
			console.log(err);
			if (err.response && err.response.data.message !== undefined) {
				setPopupMessage(err.response.data.message);
			} else {
				setPopupMessage('Something went wrong!');
			}
			setFpopup(true);
		}
		closeDialog();
		setApplying(false);
	}

	const [showDialog, setDialog] = useState(false);
	function closeDialog() {
		setDialog(false);
	}

	const [showAdmin, setShowAdmin] = useState(false);
	function closeAdmin() {
		setShowAdmin(false);
	}

	return (
		<>
			{showDialog && (
				<ConfirmDialog
					handleClose={closeDialog}
					loading={applying}
					open={showDialog}
					title={data?.title}>
					<LoadingButton
						loadingIndicator="Applying…"
						variant="contained"
						className="w-28"
						onClick={applyToEvent}
						loading={applying}
						style={!applying ? {backgroundColor: '#1565c0'} : {}}>
						<span>Apply</span>
					</LoadingButton>
				</ConfirmDialog>
			)}
			<div className="flex flex-col w-full h-auto items-center justify-center min-h-[85vh]">
				<div className="flex flex-col w-full items-end">
					{Spopup ? (
						<Popup.Success
							showpopup={setSpopup}
							message={popupMessage}></Popup.Success>
					) : null}
					{Fpopup ? (
						<Popup.Error showpopup={setFpopup} message={popupMessage}></Popup.Error>
					) : null}
				</div>
				{Loader !== 200 ? (
					<CircularLoader remainingHeight="" remainingWidth=""></CircularLoader>
				) : (
					<div className="flex flex-col w-11/12 h-auto animateFadeIn">
						<Header
							club={data?.club?.name}
							short_desc={data?.short_description}
							title={data?.title}
						/>
						<div className="flex flex-col md:flex-row w-full h-auto mt-2 items-center gap-3 md:items-start justify-center">
							<div className="flex flex-col gap-5 w-72 sm:w-96 justify-center items-center">
								<Poster image={data?.image} />
								{totalStrenth === 0 ? (
									<div className="flex justify-center items-center rounded-md bg-gray-100 h-12 border border-gray-300 w-full">
										Total capacity isn't set!
									</div>
								) : (
									<ProgressBar
										registeredStudents={appliedCount}
										totalCapacity={totalStrenth || 1}></ProgressBar>
								)}
							</div>
							<div className="flex flex-col w-full justify-center items-center mt-2 gap-3">
								{data?.report && isAuthority() ? (
									<ViewReport reportLink={data?.report}></ViewReport>
								) : null}
								{!isOrganizer && data?.vc_verified ? (
									<>
										{isApplied ? (
											(() => {
												if (isDeclined)
													return (
														<Alert severity="error" className="w-full">
															Your application has been denied for this event.
														</Alert>
													);
												if (isAccepted)
													return (
														<Alert severity="success" className="w-full">
															You have been approved to participate in this event.
														</Alert>
													);
												if (isApplied)
													return (
														<Alert severity="warning" className="w-full">
															You have already submitted an application for this
															event.
														</Alert>
													);
											})()
										) : appliedCount < totalStrenth && !isCompleted ? (
											<div className="flex flex-col lg:flex-row bg-slate-50 border border-slate-300 py-2 justify-between items-center lg:items-start rounded-md w-full">
												<BatchesComponent
													batches={data?.branch}
													fcfs={data?.fcfs || false}></BatchesComponent>
												<Button
													variant="contained"
													className="w-10/12 lg:w-5/12 h-10"
													size="large"
													style={{backgroundColor: '#1565c0', margin: '0.5rem'}}
													onClick={() => {
														setDialog(true);
													}}>
													Apply for Event
												</Button>
											</div>
										) : null}
									</>
								) : (
									<></>
								)}
								{DisplayApprovalTab(data) === true && (
									<Acceptance title={data?.title} id={props.params.id}></Acceptance>
								)}
								<EventTime
									dates={data?.date}
									venue={data?.venue}
									time={data?.time}></EventTime>
								<Description long_desc={data?.long_description}></Description>
								<Coordinators
									coordinators={(() => {
										const rv = [];
										if (data !== undefined) {
											if (data.organizer.length > 0) rv.push(...data.organizer);
											if (data.owner) rv.push(data.owner);
										}
										return rv;
									})()}></Coordinators>
							</div>
							{isOrganizer ? (
								<Fab
									color="primary"
									aria-label="edit"
									onClick={() => setShowAdmin(true)}
									sx={{
										position: 'fixed',
										bottom: '1.5rem',
										height: '4rem',
										width: '4rem',
									}}
									className="right-3 sm:right-6"
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
											d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
										/>
									</svg>
								</Fab>
							) : (
								<></>
							)}
							{showAdmin && data != undefined && (
								<AdminDialog
									eventData={data}
									href={`/event/update/${props.params.id}`}
									adminClose={closeAdmin}
									showAdmin={showAdmin}
									showSuccessPopup={() => setSpopup(true)}
									showFailurePopup={() => setFpopup(true)}
									isOrganizer={isOrganizer}
									sPopUp={{show: setSpopup, message: setPopupMessage}}
									fPopUp={{show: setFpopup, message: setPopupMessage}}></AdminDialog>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
}
