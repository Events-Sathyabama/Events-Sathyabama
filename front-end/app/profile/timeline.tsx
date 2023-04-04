import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const steps = [
	'Event Created',
	'Approved by the Head of Department',
	'Approved by the Dean',
	'Approved by the Vice-Chancellor',
	'Displayed to Students',
	'Event Completed',
	'Issued Certifications',
];

const errorLabel = [
	'Event not created',
	'Rejected by the Head of Department',
	'Rejected by the Dean',
	'Rejected by the Vice-Chancellor',
	'Event not displayed to Students',
	'Event not completed',
	'Certifications not issued',
];

export default function Timeline(props: {current: number; failed?: number; failedLabel ?:string}) {
	const isStepFailed = (step: number) => {
		return step === props.failed;
	};

	return (
		<div className="flex flex-col w-full -mt-6">
			<Stepper activeStep={props.current} orientation="vertical">
				{steps.map((label, index) => {
					const labelProps: {
						optional?: React.ReactNode;
						error?: boolean;
					} = {};
					if (isStepFailed(index)) {
						label = errorLabel[index];
						labelProps.optional = (
							<Typography color="error" className='-mt-1 text-sm'>
								{props.failedLabel}
							</Typography>
						);
						labelProps.error = true;
					}

					return (
						<Step key={label}>
							<StepLabel {...labelProps}>
								<p className="text-lg">{label}</p>
							</StepLabel>
						</Step>
					);
				})}
			</Stepper>
		</div>
	);
}
