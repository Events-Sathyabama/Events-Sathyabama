'use client';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';

interface Application {
	name: string;
	status: number;
}

interface ApplicationProps {
	showSuccessPopup: Function;
	showFailurePopup: Function;
	applications: Application[];
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
		props.showSuccessPopup();
		// for Failure popup
		// props.showFailurePopup();
	}

	const {applications} = props;
	const [updatedApplications, setUpdatedApplications] =
		useState<Application[]>(applications);

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

	return (
		<div className="flex flex-col w-full -mt-3">
			{updatedApplications.map((applicant, index) => (
				<div
					key={index}
					className="flex flex-row justify-between items-center mt-3 border-0 border-b pb-2">
					<h1 className="text-xl p-2">{applicant.name}</h1>
					{applicant.status === 0 && (
						<div className="flex flex-row gap-2">
							<Button
								variant="contained"
								className="bg-green-600 hover:bg-green-800"
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
					{applicant.status === 1 && <p className="text-green-500">Accepted</p>}
					{applicant.status === -1 && <p className="text-red-500">Denied</p>}
				</div>
			))}
			<div className="flex flex-col w-full justify-center items-center mt-4 gap-4">
				<Button
					disabled={disabled}
					variant="contained"
					size="large"
					className="bg-blue-500"
					onClick={submitApplications}>
					Submit
				</Button>
				<Pagination
					count={10}
					page={page}
					onChange={handleChange}
					color="primary"
					size="small"
				/>
			</div>
		</div>
	);
}
