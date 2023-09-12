'use client';
import Button from '@mui/material/Button';
import {useState} from 'react';
import API from '../API';
import {InterfaceParticipant} from '../datainterface';

const axios = new API.Axios();

interface ApplicationProps {
	setPopupMessage: Function;
	showSuccessPopup: Function;
	showFailurePopup: Function;
	applications: InterfaceParticipant[];
	eventId: number;
}

export default function Applications(props: ApplicationProps) {
	const [disabled, setDisabled] = useState(true);

	async function submitApplications() {
		// TODO set the popup messages.
		console.log(updatedApplications);
		try {
			const response = await axios.post(
				API.get_url('event:update_application', props.eventId),
				updatedApplications
			);
			if (response.status === 200) {
				setDisabled(true);
				props.setPopupMessage('Application changes submitted successfully!');
				props.showSuccessPopup();
			}
		} catch (e) {
			props.setPopupMessage('Something went wrong, try again!');
			props.showFailurePopup();
		}
	}

	const {applications} = props;
	const [updatedApplications, setUpdatedApplications] =
		useState<InterfaceParticipant[]>(applications);

	const handleAccept = (index: number) => {
		const updatedStatus = [...updatedApplications];
		updatedStatus[index].status = 1;
		setUpdatedApplications(updatedStatus);
		setDisabled(false);
	};

	const handleDeny = (index: number) => {
		const updatedStatus = [...updatedApplications];
		updatedStatus[index].status = -1;
		setUpdatedApplications(updatedStatus);
		setDisabled(false);
	};

	const handleUndo = (index: number) => {
		const updatedStatus = [...updatedApplications];
		updatedStatus[index].status = 0;
		setUpdatedApplications(updatedStatus);
		setDisabled(true);
	};

	return (
		<div className="flex flex-col w-full">
			{updatedApplications.length > 0 && (
				<p className="text-2xl w-full text-center mr-5">
					Applicant List for Manual Approval
				</p>
			)}
			<div className="flex flex-col w-full mb-16">
				{updatedApplications.map((applicant, index) => (
					<div
						key={index}
						className="flex flex-row w-full px-4 justify-between items-center mt-3 border-0 border-b pb-2">
						<p className="text-lg p-2 w-9/12 mr-2">{applicant.name}</p>
						{applicant.status === 0 && (
							<div className="flex flex-row gap-2 w-56 justify-end">
								<Button
									variant="outlined"
									color="success"
									onClick={() => handleAccept(index)}>
									Accept
								</Button>
								<Button
									variant="outlined"
									color="error"
									onClick={() => handleDeny(index)}>
									Deny
								</Button>
							</div>
						)}
						{applicant.status === 1 && (
							<div className="flex flex-row gap-3 w-56 justify-end items-center">
								{' '}
								<p className="text-green-700 font-medium text-md border border-green-700 p-1 px-2 rounded-md">
									ACCEPTED
								</p>
								<Button
									startIcon={
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6 text-[#1976d2] rotate-90">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3"
											/>
										</svg>
									}
									variant="outlined"
									color="primary"
									onClick={() => handleUndo(index)}>
									Undo
								</Button>
							</div>
						)}
						{applicant.status === -1 && (
							<div className="flex flex-row gap-2 w-56 justify-end items-center">
								<p className="text-red-500 font-medium text-md border border-red-600 p-1 px-2 rounded-md">
									DENIED
								</p>
								<Button
									startIcon={
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6 text-[#1976d2] rotate-90">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3"
											/>
										</svg>
									}
									variant="outlined"
									color="primary"
									onClick={() => handleUndo(index)}>
									Undo
								</Button>
							</div>
						)}
					</div>
				))}
			</div>
			{updatedApplications.length > 0 && (
				<div className="flex flex-col w-full justify-center items-center mt-4 gap-4 fixed bottom-0 py-3 bg-transparent">
					<Button
						disabled={disabled}
						variant="contained"
						size="large"
						className="bg-[#1976d2] w-80"
						onClick={submitApplications}>
						Submit Changes
					</Button>
				</div>
			)}
		</div>
	);
}
