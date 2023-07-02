'use client';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import {InterfaceParticipant} from '../datainterface';
import API from '../API';

const axios = new API.Axios();

interface ApplicationProps {
	showSuccessPopup: Function;
	showFailurePopup: Function;
	applications: InterfaceParticipant[];
	eventId: number;
}

export default function Applications(props: ApplicationProps) {
	const [page, setPage] = useState(1);
	const [disabled, setDisabled] = useState(true);
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		console.log(value); //Value is the Page Number
		setPage(value);
	};

	function submitApplications() {
		//TODO make post request here, array name is updatedApplications
		console.log(updatedApplications);
		// axios.post(API.get_url('event:update_application', props.eventId), updatedApplications);
		props.showSuccessPopup();
		// for Failure popup
		// props.showFailurePopup();
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
			<div className="flex flex-col w-full min-h-[54vh]">
				{updatedApplications.map((applicant, index) => (
					<div
						key={index}
						className="flex flex-row w-full px-4 justify-between items-center mt-3 border-0 border-b pb-2">
						<h1 className="text-xl p-2 w-9/12 mr-2">{applicant.name}</h1>
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
								<p className="text-green-700 text-md">ACCEPTED</p>
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
								<p className="text-red-500 text-md">DENIED</p>
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
			<div className="flex flex-col w-full justify-center items-center mt-4 gap-4">
				<Button
					disabled={disabled}
					variant="contained"
					size="large"
					className="bg-[#1976d2]"
					onClick={submitApplications}>
					Submit
				</Button>
				<Pagination
					count={10}
					page={page}
					onChange={handleChange}
					color="primary"
					size="medium"
				/>
			</div>
		</div>
	);
}
