'use client';
import Card from '../home/card';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import {useState} from 'react';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import Chip from '@mui/material/Chip';
import API from '../API';
import {
	InterfaceClub,
	InterfaceBranch,
	InterfaceOrganizer,
	InterfaceData,
	InterfaceError,
} from './datainterface';
import useEffect from '../useEffect';

import dayjs, {Dayjs} from 'dayjs';
const axios = new API.Axios();
const filter = createFilterOptions<InterfaceClub>();

const organizerSelected = new Set<string>([]);
export default function Create(props: {
	setData: {[x: string]: Function};
	getData: InterfaceData;
	getError: InterfaceError;
	setError: {[x: string]: Function};
	submitForm: Function;
	buttonText: string;
	setLoader: React.Dispatch<React.SetStateAction<number>>;
}) {
	// Data that has to be Fetched from server
	const setData = props.setData;
	const getData = props.getData;
	const getError = props.getError;
	const setError = props.setError;
	const [clubList, setClubList] = useState<InterfaceClub[]>([
		{name: 'Loading...', abbreviation: ''},
	]);
	const [BranchList, setBranchList] = useState<InterfaceBranch[]>([
		{name: 'Loading...', batch: '', pk: -1},
	]);
	const [coordinatorList, setCoordinatorList] = useState([]);

	// API calls starts
	const runOnce = true; // to force this useEffect to only run once
	useEffect(
		async () => {
			const request = await axios.get(API.get_url('event:club_branch'));
			console.log(request.data);
			if (request.status === 200) {
				setClubList(request.data.club);
				setBranchList(request.data.branch);
			}
		},
		[],
		props.setLoader,
		runOnce
	);

	// API Calls ends

	async function searchOrganizer(event: React.ChangeEvent<HTMLInputElement>) {
		const request = await axios.get(API.get_url('user:organizer'), {
			q: event?.target?.value,
		});

		setCoordinatorList(request.data.results);
	}

	// checkbox state to enable Custom Club Name element
	const [imageBlob, setImageBlob] = useState<string>('');
	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		setData.image(file);
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			setImageBlob(reader.result as string);
		};
		reader.readAsDataURL(file);
	};

	// converts date to 21 Mar '23 format
	const convertDate = (date: Dayjs | undefined) => {
		if (date) {
			return date.format("DD MMM 'YY");
		}
		return date;
	};
	const handleSubmit = async (event: any) => {
		event.preventDefault();
		console.log('hi');
		await props.submitForm();
	};

	return (
		<>
			<div className="flex flex-col w-full justify-center items-center gap-4 px-2">
				<h1 className="text-2xl text-center underline mt-3">
					Create/Edit your Event
				</h1>
				<div className="flex flex-col md:flex-row w-full sm:px-4 gap-4 md:gap-0 items-center md:items-start">
					<form
						onSubmit={handleSubmit}
						className="flex flex-col w-full mx-5 gap-4 max-w-sm md:max-w-full">
						<TextField
							autoComplete="off"
							required
							id="outlined-required"
							label="Event Name Here"
							fullWidth
							error={getError.title !== null}
							onChange={(e) => {
								setData.title(e.target.value);
								setError.title(null);
							}}
							value={getData.title}
							helperText={
								getError.title ||
								"Please limit the length of your event name, as it will be displayed on both the homepage cards and the event's details page."
							}
						/>
						<Autocomplete
							value={getData.club}
							onChange={(event, newValue) => {
								if (typeof newValue === 'string') {
									setData.club({
										name: newValue,
									});
								} else if (newValue && newValue.inputValue) {
									setData.club({
										name: newValue.inputValue,
									});
								} else {
									setData.club(newValue);
								}
								setError.club(null);
							}}
							filterOptions={(options, params) => {
								const filtered = filter(options, params);

								const {inputValue} = params;
								// Suggest the creation of a new value
								const isExisting = options.some(
									(option) => inputValue === option.name
								);
								if (inputValue !== '' && !isExisting) {
									filtered.push({
										inputValue,
										name: `Your club or organiser's name was not found, Add "${inputValue}"`,
									});
								}

								return filtered;
							}}
							selectOnFocus
							clearOnBlur
							handleHomeEndKeys
							id="disable-clearable"
							options={clubList}
							getOptionLabel={(option) => {
								// Value selected with enter, right from the input
								if (typeof option === 'string') {
									return option;
								}
								// Add "xxx" option created dynamically
								if (option.inputValue) {
									// setData.club({name: option.inputValue});
									return option.inputValue;
								}
								// Regular option
								return option.name;
							}}
							renderOption={(props, option) => <li {...props}>{option.name}</li>}
							freeSolo
							renderInput={(params) => (
								<TextField
									{...params}
									error={getError.club !== null}
									required
									label="Organiser/Club Name Here"
									variant="outlined"
									value={getData.club?.name}
									helperText={
										getError.club ||
										"Please enter your club or organiser's name in this field. This will reflect on both the homepage cards and the event's details page."
									}
								/>
							)}
						/>

						<Button
							variant="outlined"
							component="label"
							className={
								(getError.image !== null ? 'border-red-700 text-red-700' : '') +
								' w-auto max-w-xl'
							}>
							Upload your Event Poster Here*
							<input
								hidden
								accept="image/*"
								multiple
								type="file"
								onChange={(e) => {
									handleImageUpload(e);
									setError.image(null);
								}}
							/>
						</Button>
						<p className="-mt-2 text-xs text-gray-500 ml-3">
							{getError.image ||
								"Event Poster will be displayed on both the homepage cards and the event's details page."}
						</p>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-5">
								<div className="flex flex-col gap-1">
									<p className="ml-1">Your Event's Start Date*</p>
									<MobileDatePicker
										className="w-fit"
										value={getData.start_date}
										onChange={(date: any) => {
											setData.start_date(date);
											setError.start_date(null);
											if (getData.end_date) {
												setData.end_date(date);
											}
										}}
										disablePast
										format="DD/MM/YY"
									/>
									<p className="text-red-600">{getError.start_date}</p>
								</div>
								<div className="flex flex-col gap-1">
									<p className="ml-1">Your Event's End Date*</p>
									<MobileDatePicker
										disabled={getData.start_date === undefined}
										className="w-fit"
										disablePast
										value={getData.end_date}
										minDate={getData.start_date}
										onChange={(date: any) => setData.end_date(date)}
										format="DD/MM/YY"
									/>
									<p className="text-red-600">{getError.end_date}</p>
								</div>
							</div>
							<p className="-mt-3 text-xs text-gray-500 ml-3">
								Date fields are optional. If it is a single day event, please specify
								the same date for the start and end date.
							</p>
						</LocalizationProvider>
						<TextField
							autoComplete="off"
							id="outlined-required"
							label="Short Description Here*"
							fullWidth
							error={getError.short_description !== null}
							onChange={(event) => {
								setData.short_description(event.target.value);
								setError.short_description(null);
							}}
							value={getData.short_description}
							helperText={
								getError.short_description ||
								"This will be reflected on the homepage cards and the event's details page header."
							}
							inputProps={{maxLength: 100}}
						/>
						<TextField
							id="outlined-multiline-flexible"
							label="Long Description Here"
							name="longDescription"
							multiline
							minRows={4}
							error={getError.long_description !== null}
							value={getData.long_description}
							onChange={(event: any) => {
								setData.long_description(event.target.value);
								setError.long_description(null);
							}}
							helperText={
								getError.long_description ||
								'Please provide a detailed explanation of the event in this field. Include any important details or context about the event here.'
							}
						/>
						{/* Branch */}
						<Autocomplete
							multiple
							options={BranchList}
							value={getData.branch}
							groupBy={(option) => option.name}
							getOptionLabel={(option) =>
								`${option.name}` + option.batch !== '' ? ` ${option.batch}` : ''
							}
							filterSelectedOptions
							onChange={(event, newValue) => {
								setData.branch(newValue);
							}}
							renderTags={(tagValue, getTagProps) =>
								tagValue.map((option, index) => (
									<Chip
										label={`${option.name} (${option.batch})`}
										{...getTagProps({index})}
									/>
								))
							}
							renderInput={(params) => (
								<TextField
									{...params}
									error={getError.branch !== null}
									label={getError.branch || "Event's Branch and Batch Selection"}
									placeholder="Start typing here.."
								/>
							)}
						/>

						{/* Co-ordinators */}
						<Autocomplete
							multiple
							value={getData.organizer}
							filterSelectedOptions
							onChange={(event, newValue) => {
								organizerSelected.clear();
								setData.organizer([
									getData.owner,
									...newValue.filter((option) => {
										organizerSelected.add(option.college_id);
										return getData.owner.college_id !== option.college_id;
									}),
								]);
							}}
							options={(() => {
								return coordinatorList.filter((options) => {
									// @ts-expect-error
									return !organizerSelected.has(options.college_id);
								});
							})()}
							getOptionLabel={(option) => `${option.name} - ${option.college_id}`}
							renderTags={(tagValue, getTagProps) =>
								tagValue.map((option, index) => (
									<Chip
										label={option.name + ' - ' + option.college_id}
										{...getTagProps({index})}
										disabled={getData.owner.college_id === option.college_id}
									/>
								))
							}
							renderInput={(params) => (
								<TextField
									{...params}
									onChange={searchOrganizer}
									error={getError.organizer !== null}
									label={
										getError.organizer || 'Faculty and Student Coordinators Here'
									}
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
							value={getData.date}
							error={getError.date !== null}
							onChange={(event) => {
								setData.date(event.target.value);
								setError.date(null);
							}}
							helperText={
								getError.date ||
								"Please specify the dates for each sub-event(optional) in the text field above. This will be displayed on the event's details page."
							}
						/>
						<TextField
							id="outlined-multiline-flexible"
							label="Duration Here"
							name="duration"
							multiline
							minRows={2}
							value={getData.time}
							error={getError.time !== null}
							onChange={(event) => {
								setData.time(event.target.value);
								setError.time(null);
							}}
							helperText={
								getError.time ||
								'Please provide specific instructions regarding the timing of the event, including the duration and the time at which students are required to report to the venue.'
							}
						/>
						<TextField
							autoComplete="off"
							id="outlined-required"
							label="Venue Here"
							fullWidth
							name="venue"
							error={getError.venue !== null}
							value={getData.venue}
							onChange={(event) => {
								setData.venue(event.target.value);
								setError.venue(null);
							}}
							helperText={getError.venue || 'Venue is optional.'}
						/>
						<p className="text-xs text-gray-500 ml-3 md:hidden">
							Please review the preview of your event's homepage card below and click
							submit.
						</p>
						<Button type="submit" variant="contained" className="bg-blue-500">
							{props.buttonText || 'Submit'}
						</Button>
					</form>
					<div className="block max-w-sm md:max-w-fit">
						<div className="flex flex-col gap-2 items-center justify-center bg-blue-50 p-3 rounded-md">
							<p className="text-2xl underline">Preview</p>
							<Card
								title={getData.title || "Event's Name Here"}
								subheader={getData.club?.name || "Organiser/Club's Name Here"}
								imageUrl={(() => {
									if (imageBlob) {
										return imageBlob;
									}
									if (typeof getData.image === 'string') {
										return getData.image;
									}
									return 'pulseLoading';
								})()} // pulseLoading shows the pulse loader
								description={getData.short_description || 'Short Description Here'}
								date={(() => {
									let eventDate: string | undefined = '';

									if (
										convertDate(getData.start_date) ===
											convertDate(getData.end_date) &&
										convertDate(getData.start_date) !== ''
									) {
										eventDate = convertDate(getData.start_date);
									} else if (
										convertDate(getData.start_date) &&
										convertDate(getData.end_date)
									) {
										eventDate =
											convertDate(getData.start_date) +
											' - ' +
											convertDate(getData.end_date);
									} else if (convertDate(getData.start_date)) {
										eventDate = convertDate(getData.start_date);
									} else {
										eventDate = "Event's Date Here";
									}

									eventDate = eventDate || "Event's Date Here";
									return eventDate;
								})()}
								hover={false}></Card>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
