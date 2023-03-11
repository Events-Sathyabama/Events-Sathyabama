'use client';
import Card from '../home/card';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import {useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// TODO Fetch Clubs in this way
const clubs = [
	{name: 'Music Club'},
	{name: 'Dance Club'},
	{name: 'ACM'},
	{name: 'Google Developers Student Club'},
	{name: 'Community Development Club'},
];

// TODO Fetch Branches in this way
const matchedList = [
	{name: 'CSE 2020-2024'},
	{name: 'CSE 2021-2025'},
	{name: 'CSE 2022-2026'},
];

interface ClubsType {
	name: string;
}

export default function Create() {
	const [eventName, setEventName] = useState('');
	const handleEventNameChange = (event: any) => {
		setEventName(event.target.value);
	};

	const defaultProps = {
		options: clubs,
		getOptionLabel: (option: ClubsType) => option.name,
	};
	const flatProps = {
		options: clubs.map((option) => option.name),
	};
	const [value, setValue] = React.useState<any | any>(null);
	const [club, setClub] = useState('');
	const [checked, setChecked] = React.useState(false);

	const [image, setImage] = useState<string | string>('');
	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			setImage(reader.result as string);
		};
		reader.readAsDataURL(file);
	};

	const [description, setDescription] = useState('');
	function handleDescriptionChange(event: any) {
		setDescription(event.target.value);
	}

	// Date Picker
	const minSelectableDate = dayjs().startOf('day');
	const [startDate, setStartDate] = useState('');
	const [showEnd, setShowEnd] = useState(false);
	const [minEndDate, setMinEndDate] = useState();
	const [endDate, setEndDate] = useState('');
	let selectedDate;
	const handleDateChange = (date: any) => {
		setShowEnd(true);
		selectedDate = new Date(date);
		setMinEndDate(date);
		const day = selectedDate.getDate();
		const month = selectedDate.toLocaleDateString('default', {month: 'short'}); // January is 0
		const year = selectedDate.getFullYear().toString().slice(-2);
		setStartDate(day + ' ' + month.substring(0, 3) + " '" + year);
	};

	const handleEndDateChange = (date: any) => {
		selectedDate = new Date(date);
		const day = selectedDate.getDate();
		const month = selectedDate.toLocaleDateString('default', {month: 'short'}); // January is 0
		const year = selectedDate.getFullYear().toString().slice(-2);
		setEndDate(day + ' ' + month.substring(0, 3) + " '" + year);
	};

	return (
		<div className="flex flex-col w-full justify-center items-center gap-4">
			<h1 className="text-2xl text-center underline mt-3">Create your Event</h1>
			<div className="flex flex-col bg-red-100 mx-2 rounded-md p-3 lg:hidden">
				<h1 className="text-xl underline font-semibold">Note:</h1>
				<p>
					For optimal results in visualizing the final appearance of your card on the
					portal, we highly recommend utilizing a personal computer or laptop in
					full-screen mode during the creation or editing process. This will allow
					you to have a comprehensive preview of your card's layout, design, and
					other details before it goes live on the portal.
				</p>
			</div>
			<div className="flex flex-row w-full px-4">
				<div className="flex flex-col w-full mx-5 gap-4">
					<TextField
						autoComplete="off"
						required
						id="outlined-required"
						label="Event Name Here"
						defaultValue=""
						fullWidth
						onChange={handleEventNameChange}
						value={eventName}
						helperText="Please limit the length of your event name, as it will be displayed on both the homepage cards and the event's details page."
					/>
					<Autocomplete
						{...defaultProps}
						disabled={checked === true}
						id="disable-clearable"
						disableClearable
						value={value}
						onChange={(event, newValue) => {
							setValue(newValue);
							setClub(newValue.name);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								required
								label="Organiser/Club Name Here"
								variant="outlined"
								helperText="Check our list first. If your club or organiser's name is not included, check the box below to manually enter it."
							/>
						)}
					/>
					<FormControlLabel
						className="ml-3"
						disabled={club !== ''}
						control={
							<Checkbox
								checked={checked}
								onChange={() => {
									setChecked(!checked);
								}}
								className="w-max"
								inputProps={{'aria-label': 'controlled'}}
							/>
						}
						label="I assure you that my club or organiser name was not found in the above list."
					/>
					{checked ? (
						<TextField
							required
							autoComplete="off"
							disabled={!checked}
							id="outlined-required"
							label="New Organiser/Club Name Here"
							defaultValue=""
							onChange={(event) => {
								setClub(event.target.value);
							}}
							value={club}
							helperText="Double check for typos while entering your club/organiser name in the list above. If you still can't find it, proceed by manually entering your club/organiser name here."
						/>
					) : null}
					<Button variant="outlined" component="label" className="w-auto max-w-xl">
						Upload your Event Poster Here*
						<input
							hidden
							accept="image/*"
							multiple
							type="file"
							onChange={handleImageUpload}
							required
						/>
					</Button>
					<p className="-mt-2 text-xs text-gray-500 ml-3">
						Event Poster will be displayed on both the homepage cards and the event's
						details page.
					</p>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-5">
							<div className="flex flex-col gap-1">
								<p className="ml-1">Your Event's Start Date</p>
								<MobileDatePicker
									className="w-fit"
									onChange={handleDateChange}
									minDate={minSelectableDate}
									disablePast
									format="DD/MM/YY"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<p className={showEnd ? '' : 'text-gray-300'}>
									Your Event's End Date
								</p>
								<MobileDatePicker
									disabled={!showEnd}
									className="w-fit"
									disablePast
									minDate={minEndDate}
									onChange={handleEndDateChange}
									format="DD/MM/YY"
								/>
							</div>
						</div>
						<p className="-mt-3 text-xs text-gray-500 ml-3">
							Date fields are optional. If it is a single day event, please specify
							the same date for the start and end date.
						</p>
					</LocalizationProvider>
					<TextField
						autoComplete="off"
						required
						id="outlined-required"
						label="Short Description Here"
						fullWidth
						onChange={handleDescriptionChange}
						value={description}
						helperText="This will be reflected on the homepage cards and the event's details page header."
						inputProps={{maxLength: 100}}
					/>
					<TextField
						id="outlined-multiline-flexible"
						label="Long Description Here"
						name="longDescription"
						multiline
						minRows={4}
						helperText="Please provide a detailed explanation of the event in this field. Include any important details or context about the event here."
					/>
					{/* Branch */}
					<Autocomplete
						multiple
						id="tags-outlined"
						options={matchedList}
						getOptionLabel={(option) => option.name}
						filterSelectedOptions
						renderInput={(params) => (
							<TextField
								{...params}
								label="Event's Branches"
								placeholder="Select the branches that the Event is open to.."
							/>
						)}
					/>
					<TextField
						id="outlined-multiline-flexible"
						label="Date - Detailed"
						name="dateDetail"
						multiline
						minRows={2}
						helperText="Please specify the dates for each sub-event(optional) in the text field above. This will be displayed on the event's details page."
					/>
					<TextField
						id="outlined-multiline-flexible"
						label="Duration Here"
						name="duration"
						multiline
						minRows={2}
						helperText="Please provide specific instructions regarding the timing of the event, including the duration and the time at which students are required to report to the venue."
					/>
					<TextField
						autoComplete="off"
						id="outlined-required"
						label="Venue Here"
						defaultValue=""
						fullWidth
						name="venue"
						helperText="Venue is optional."
					/>
				</div>
				<div className="hidden lg:block">
					<div className="flex flex-col gap-2 items-center justify-center bg-blue-50 p-3 rounded-md">
						<p className="text-2xl underline">Preview</p>
						<Card
							title={eventName || "Event's Name Here"}
							subheader={club || "Organiser/Club's Name Here"}
							imageUrl={image || 'pulseLoading'} // pulseLoading shows the pulse loader
							description={description || 'Short Description Here'}
							date={
								startDate === endDate && startDate !== ''
									? startDate
									: startDate && endDate
									? startDate + ' - ' + endDate
									: startDate
									? startDate
									: "Event's Date Here"
							}
							learnMoreLink="/create"
							hover={false}></Card>
					</div>
				</div>
			</div>
		</div>
	);
}
