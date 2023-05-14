'use client';
import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabsContainer from '@mui/material/Tabs';
import Applications from './applications';
import {InterfaceParticipant} from '../datainterface';

function TabPanel(props: any) {
	const {children, value, index, ...other} = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}>
			{value === index && (
				<div className="flex flex-col w-full items-start justify-center">
					{children}
				</div>
			)}
		</div>
	);
}

export default function Tabs(props: {
	showSuccessPopup: Function;
	showFailurePopup: Function;
	isOrganizer: boolean;
	participant: InterfaceParticipant[];
	fcfs: boolean;
	eventId: number;
}) {
	const [value, setValue] = React.useState(0);
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<div className="flex flex-col w-full sm:items-center">
			<TabsContainer
				value={value}
				onChange={handleChange}
				variant="scrollable"
				scrollButtons="auto"
				aria-label="scrollable auto tabs example">
				<Tab
					label={
						<div className="flex flex-col md:flex-row md:gap-2 justify-center items-center">
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
									d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
								/>
							</svg>
							<h1 className="text-lg sm:text-xl" style={{textTransform: 'none'}}>
								Description
							</h1>
						</div>
					}
				/>
				<Tab
					label={
						<div className="flex flex-col md:flex-row md:gap-2 justify-center items-center">
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
									d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
								/>
							</svg>
							<h1 className="text-lg sm:text-xl" style={{textTransform: 'none'}}>
								Coordinators
							</h1>
						</div>
					}
				/>
				{props.isOrganizer ? (
					<Tab
						label={
							<div className="flex flex-col md:flex-row md:gap-2 justify-center items-center">
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
										d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
									/>
								</svg>
								<h1 className="text-lg sm:text-xl" style={{textTransform: 'none'}}>
									Applications
								</h1>
							</div>
						}
					/>
				) : (
					<></>
				)}
			</TabsContainer>
			<div className="w-full pt-3 border-t border-gray-300">
				{props.isOrganizer ? (
					<TabPanel value={value} index={2}>
						<Applications
							applications={props.participant}
							showSuccessPopup={props.showSuccessPopup}
							showFailurePopup={props.showFailurePopup}
							eventId={props.eventId}
						/>
					</TabPanel>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
