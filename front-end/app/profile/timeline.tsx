import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import {TimeLineHistory} from '../datainterface';
import LetterAvatar from '../avatar';

// const steps = [
// 	'Event Created',
// 	'Approved by the Head of Department',
// 	'Approved by the Dean',
// 	'Approved by the Vice-Chancellor',
// 	'Displayed to Students',
// 	'Event Ongoing',
// 	'Event Completed',
// 	'Report Submitted',
// 	'Report Approved',
// 	'Issued Certifications',
// ];

// const errorLabel = [
// 	'Event not Created',
// 	'Rejected by the Head of Department',
// 	'Rejected by the Dean',
// 	'Rejected by the Vice-Chancellor',
// 	'Event not displayed to Students',
// 	'Event not Ongoing',
// 	'Event not Completed',
// 	'Report not Submitted',
// 	'Report not Approved',
// 	'Certifications not Issued',
// ];

const waitingLabel = [
	'',
	'Awaiting Approval from the Head of Department...',
	'Awaiting Approval from the Dean...',
	'Awaiting Approval from the Vice-Chancellor...',
	'',
	'Awaiting the ongoing occurrence of the event...',
	'Awaiting event completion...',
	'Awaiting report submission...',
	'Awaiting report approval...',
	'Awaiting certification issuance...',
];

export default function Timeline(props: {history: TimeLineHistory[] | undefined}) {
	let currentStep = 0;
	// not_visited = 0;
	// ongoing = 1;
	// completed = 2;
	// rejected = -1;
	console.log(props.history);

	if (props.history) {
		for (let i = 0; i < props.history.length; i++) {
			if (props.history[i].status === -1 || props.history[i].status === 0) {
				currentStep = i - 1;
				break;
			}
		}
	}

	function isStepFailed(idx: number) {
		return props.history && props.history[idx].status === -1;
	}

	function formatDate(inputDateTime: string) {
		if (inputDateTime == null) return '';
		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];

		const date = new Date(inputDateTime);
		const year = date.getFullYear();
		const month = months[date.getMonth()];
		const day = date.getDate();

		let hours = date.getHours();
		const minutes = date.getMinutes();
		const ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12 || 12;
		const formattedDateTime = ` - ${month} ${day}, ${year} ${hours}:${
			minutes < 10 ? '0' : ''
		}${minutes} ${ampm}`;
		return formattedDateTime;
	}

	return (
		<div className="flex flex-col w-full -mt-6">
			<Stepper activeStep={currentStep} orientation="vertical">
				{props.history?.map((history, index) => {
					const labelProps: {
						optional?: React.ReactNode;
						error?: boolean;
					} = {};

					if (index === currentStep && waitingLabel[index] !== '') {
						history.success_title = waitingLabel[index];
					}

					if (history.message != '') {
						labelProps.optional = (
							<pre className="mt-3 p-3 border rounded-md border-gray-300 text-sm whitespace-pre-line font-roboto">
								<div>{history.message}</div>
							</pre>
						);
					}

					if (isStepFailed(index)) {
						history.success_title = history.failure_title;
						labelProps.optional = (
							<pre
								color="error"
								className="mt-3 p-3 border rounded-md border-gray-300 text-sm whitespace-pre-line font-roboto">
								<div>{history.message}</div>
							</pre>
						);
						labelProps.error = true;
					}

					return (
						<Step key={history.success_title}>
							<StepLabel {...labelProps}>
								<p className="text-lg">
									{history.success_title}{' '}
									<span className="text-sm text-blue-500">
										{formatDate(history.date)}
									</span>
								</p>
								{history.user != null ? (
									<div className="flex flex-row w-full items-center gap-2 mt-1">
										<LetterAvatar
											name={history.user?.name}
											width="2rem"
											height="2rem"
											fontSize="0.8rem"></LetterAvatar>
										<p className="text-lg text-gray-600 truncate w-72 sm:w-96">
											{history.user?.name}
										</p>
									</div>
								) : (
									<></>
								)}
							</StepLabel>
						</Step>
					);
				})}
			</Stepper>
		</div>
	);
}
