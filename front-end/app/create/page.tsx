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
import Chip from '@mui/material/Chip';
import API from '../API';

const axios = new API.Axios();
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

// TODO Fetch Coordinators in this way
const Coordinators = [
	{name: 'Bandepalli Surya', id: '40110156'},
	{name: 'Aryan Amish', id: '4011022'},
	{name: 'Dr. Revathy', id: '11'},
	{name: 'John King', id: '41101022'},
];

export default function Create() {
	// API calls starts
	let [clubs, setClubs] = useState([{name: 'Loading...'}]);
	let [matchedList, setMatchedList] = useState([
		{name: 'Loading...', abbreviation: 'Loading...'},
	]);
	React.useEffect(() => {
		(async () => {
			const request = await axios.get(API.get_url('event:club_branch'));
			if (request.status === 200) {
				setClubs(request.data.club);
				setMatchedList(request.data.branch);
			}
		})();
	}, []);

	// TODO Fetch Clubs in this way

	// API Calls ends

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

	const fixedOptions = [Coordinators[0]];
	const [coval, setCoval] = React.useState([...fixedOptions]);

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		try {
			console.log('Submitting');
			// submit here all params
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex flex-col w-full justify-center items-center gap-4 px-2">
			<h1 className="text-2xl text-center underline mt-3">Create/Edit your Event</h1>
			<div className="flex flex-col md:flex-row w-full sm:px-4 gap-4 md:gap-0 items-center md:items-start">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col w-full mx-5 gap-4 max-w-sm md:max-w-full">
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
								required
								label="Event's Branch and Batch Selection"
								placeholder="Start typing here.."
							/>
						)}
					/>
					{/* Co-ordinators */}
					<Autocomplete
						multiple
						id="fixed-tags-demo"
						value={coval}
						onChange={(event, newValue) => {
							setCoval([
								...fixedOptions,
								...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
							]);
							console.log(newValue);
						}}
						options={Coordinators}
						getOptionLabel={(option) => `${option.name} - ${option.id}`}
						renderTags={(tagValue, getTagProps) =>
							tagValue.map((option, index) => (
								<Chip
									label={option.name + ' - ' + option.id}
									{...getTagProps({index})}
									disabled={fixedOptions.indexOf(option) !== -1}
								/>
							))
						}
						renderInput={(params) => (
							<TextField
								required
								{...params}
								label="Faculty and Student Coordinators Here"
								placeholder="Name, Employee ID or Register Number Here"
							/>
						)}
					/>
					<TextField
						id="outlined-multiline-flexible"
						label="Date - Detailed Here"
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
					<p className="text-xs text-gray-500 ml-3 md:hidden">
						Please review the preview of your event's homepage card below and click
						submit.
					</p>
					<Button type="submit" variant="contained" className="bg-blue-500">
						Submit Event For Review
					</Button>
				</form>
				<div className="block max-w-sm md:max-w-fit">
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
