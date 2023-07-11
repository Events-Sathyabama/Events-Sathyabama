import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import {TimeLineHistory} from '../datainterface';

const steps = [
	'Event Created',
	'Approved by the Head of Department',
	'Approved by the Dean',
	'Approved by the Vice-Chancellor',
	'Displayed to Students',
	'Event Ongoing',
	'Event Completed',
	'Report Submitted',
	'Report Approved',
	'Issued Certifications',
];

const errorLabel = [
	'Event not Created',
	'Rejected by the Head of Department',
	'Rejected by the Dean',
	'Rejected by the Vice-Chancellor',
	'Event not displayed to Students',
	'Event not Ongoing',
	'Event not Completed',
	'Report not Submitted',
	'Report not Approved',
	'Certifications not Issued',
];

export default function Timeline(props: {history: TimeLineHistory[] | undefined}) {
	let currentStep = 0;
	if (props.history) {
		for (let i = 0; i < props.history.length; i++) {
			if (props.history[i].status === -1) {
				currentStep = i - 1;
				break;
			}
		}
	}

	function isStepFailed(idx: number) {
		return props.history && props.history[idx].status === 0;
	}

	return (
		<div className="flex flex-col w-full -mt-6">
			<Stepper activeStep={currentStep} orientation="vertical">
				{props.history?.map((history, index) => {
					const labelProps: {
						optional?: React.ReactNode;
						error?: boolean;
					} = {};

					if (isStepFailed(index)) {
						labelProps.optional = (
							<Typography color="error" className="-mt-1 text-sm">
								<div>{history.message}</div>
							</Typography>
						);
						labelProps.error = true;
					}

					return (
						<Step key={history.title}>
							<StepLabel {...labelProps}>
								<p className="text-lg">{history.title}</p>
							</StepLabel>
						</Step>
					);
				})}
			</Stepper>
		</div>
	);
}
