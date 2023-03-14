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
import {useRouter} from 'next/navigation';
const axios = new API.Axios();

// TODO Fetch Coordinators in this way

export default function Create() {
	// Data that has to be Fetched from server
	const [clubList, setClubList] = useState([{name: 'Loading...'}]);
	const [BranchList, setBranchList] = useState([
		{name: 'Loading...', abbreviation: 'Loading...'},
	]);
	const [coordinatorList, setCoordinatorList] = useState([
		{name: 'Bandepalli Surya', id: '40110156'},
		{name: 'Aryan Amish', id: '4011022'},
		{name: 'Dr. Revathy', id: '11'},
		{name: 'John King', id: '41101022'},
	]);
	const [fixedOptions, setFixedOptions] = useState<any>([{name: '-', id: '-'}]);
	// API calls starts

	React.useEffect(() => {
		(async () => {
			const request = await axios.get(API.get_url('event:club_branch'));
			if (request.status === 200) {
				setClubList(request.data.club);
				setBranchList(request.data.branch);
			}
		})();
		setFixedOptions([
			{
				name: localStorage.getItem('name') || '',
				id: API.jwt(localStorage.getItem('access')).user_id || '',
			},
		]);
	}, []);

	React.useEffect(() => {
		(async () => {
			// const request = await axios.get(API.get_url('event:organizer'));
		})();
	}, []);
	// API Calls ends
	const [imageBlob, setImageBlob] = useState<string>();
	const [setData, getData, getError, setError, sendData] = (() => {
		const [title, setTitle] = useState('');
		const [clubName, setClubName] = useState<any | null>(null);
		const [image, setImage] = useState<File | undefined>(undefined);
		const [startDate, setStartDate] = useState('');
		const [endDate, setEndDate] = useState('');
		const [shortDesc, setShortDesc] = useState('');
		const [longDesc, setLongDesc] = useState('');
		const [branchName, setBranchName] = useState('');
		const [date, setDate] = useState('');
		const [duration, setDuration] = useState('');
		const [venue, setVenue] = useState('');
		const [coordinator, setCoordinator] = useState<
			{name: string; id: string}[] | any
		>([...fixedOptions]);
		const getData = {
			title: title,
			club: clubName,
			image: image,
			start_date: startDate,
			end_date: endDate,
			short_description: shortDesc,
			long_description: longDesc,
			branch: branchName,
			date: date,
			duration: duration,
			venue: venue,
			organizer: coordinator,
		};

		const sendData = () => {
			console.log(image);
			return {
				organizer: (() => {
					const rv = [];
					for (let i = 0; i < coordinator.length; i++) {
						rv.push(coordinator[i].id);
					}
					return rv;
				})(),
				image: image,
				title: title,
				short_description: shortDesc,
				long_description: longDesc,
				club: clubName.name,
				venue: venue,
				start_date: new Date(startDate).toISOString().slice(0, 10),
				end_date: new Date(startDate).toISOString().slice(0, 10),
				date: date,
				time: duration,
				branch: branchName,
			};
		};
		const setData = {
			title: setTitle,
			club: setClubName,
			image: setImage,
			start_date: setStartDate,
			end_date: setEndDate,
			short_description: setShortDesc,
			long_description: setLongDesc,
			branch: setBranchName,
			date: setDate,
			duration: setDuration,
			venue: setVenue,
			organizer: setCoordinator,
		};

		const [titleError, setTitleError] = useState<null | string>(null);
		const [clubNameError, setClubNameError] = useState<null | string>(null);
		const [imageError, setImageError] = useState<null | string>(null);
		const [startDateError, setStartDateError] = useState<null | string>(null);
		const [endDateError, setEndDateError] = useState<null | string>(null);
		const [shortDescError, setShortDescError] = useState<null | string>(null);
		const [longDescError, setLongDescError] = useState<null | string>(null);
		const [branchNameError, setBranchNameError] = useState<null | string>(null);
		const [dateError, setDateError] = useState<null | string>(null);
		const [durationError, setDurationError] = useState<null | string>(null);
		const [venueError, setVenueError] = useState<null | string>(null);
		const [coordinatorError, setCoordinatorError] = useState<null | string>(null);

		const getError = {
			title: titleError,
			club: clubNameError,
			image: imageError,
			start_date: startDateError,
			end_date: endDateError,
			short_description: shortDescError,
			long_description: longDescError,
			branch: branchNameError,
			date: dateError,
			duration: durationError,
			venue: venueError,
			organizer: coordinatorError,
		};
		const setError: {[x: string]: Function} = {
			title: setTitleError,
			club: setClubNameError,
			image: setImageError,
			start_date: setStartDateError,
			end_date: setEndDateError,
			short_description: setShortDescError,
			long_description: setLongDescError,
			branch: setBranchNameError,
			date: setDateError,
			duration: setDurationError,
			venue: setVenueError,
			organizer: setCoordinatorError,
		};
		return [setData, getData, getError, setError, sendData];
	})();

	// checkbox state to enable Custom Club Name element
	const [checked, setChecked] = React.useState(false);
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

	// Restrict date picker to not select previous dates
	const minSelectableDate = dayjs().startOf('day');

	// converts date to 21 Mar '23 format
	const convertDate = (date: Date | null | string) => {
		if (date === null || date === '') {
			return date;
		}
		const selectedDate = new Date(date);
		const day = selectedDate.getDate();
		const month = selectedDate.toLocaleDateString('default', {month: 'short'}); // January is 0
		const year = selectedDate.getFullYear().toString().slice(-2);
		return day + ' ' + month.substring(0, 3) + " '" + year;
	};
	const router = useRouter();

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		try {
			const request = await axios.post(API.get_url('event:create'), sendData(), {
				'Content-Type': 'multipart/form-data',
			});
			router.push(`details/${request.data.id}`);
		} catch (error: any) {
			for (let field in setError) {
				setError[field](null);
			}
			for (let field in error.response.data) {
				setError[field](error.response.data[field]);
			}
			window.scroll({
				top: 0,
				left: 0,
				behavior: 'smooth',
			});
			console.error(error.response.data);
		}
	};

	return (
		<>
			<div className="flex flex-col w-full justify-center items-center gap-4 px-2">
				<h1 className="text-2xl text-center underline mt-3">
					Create/Edit your Event
				</h1>
				<div
					className="bg-green-700 cursor-pointer p-1 rounded-md"
					onClick={(e) => console.log(typeof getData.start_date, getData)}>
					DEBUG
				</div>
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
							options={clubList}
							getOptionLabel={(option: {name: string}) => {
								return option.name;
							}}
							disabled={checked === true}
							id="disable-clearable"
							value={getData.club}
							onChange={(event, newValue) => {
								setData.club(newValue);
								setError.club(null);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									error={getError.club !== null && !checked}
									required
									label="Organiser/Club Name Here"
									variant="outlined"
									helperText={
										getError.club ||
										"Check our list first. If your club or organiser's name is not included, check the box below to manually enter it."
									}
								/>
							)}
						/>
						<FormControlLabel
							className="ml-3"
							disabled={getData.club !== null}
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
								error={getError.club !== null}
								onChange={(event) => {
									setData.club(event.target.value);
									setError.club(null);
								}}
								value={getData.club}
								helperText={
									getError.club ||
									"Double check for typos while entering your club/organiser name in the list above. If you still can't find it, proceed by manually entering your club/organiser name here."
								}
							/>
						) : null}
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
										onChange={(date: any) => setData.start_date(date)}
										minDate={minSelectableDate}
										disablePast
										format="DD/MM/YY"
									/>
								</div>
								<div className="flex flex-col gap-1">
									<p className={getData.start_date !== '' ? '' : 'text-gray-300'}>
										Your Event's End Date*
									</p>
									<MobileDatePicker
										disabled={getData.start_date === ''}
										className="w-fit"
										disablePast
										minDate={getData.start_date}
										onChange={(date: any) => setData.end_date(date)}
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
							id="tags-outlined"
							options={BranchList}
							getOptionLabel={(option) => option.name}
							filterSelectedOptions
							renderInput={(params) => (
								<TextField
									{...params}
									error={getError.branch !== null}
									label={getError.branch || "Event's Branch and Batch Selection"}
									placeholder="Start typing here.."
									value={getData.branch}
									onChange={(event: any) => {
										setData.branch(event.target.value);
										setError.branch(null);
									}}
								/>
							)}
						/>
						{/* Co-ordinators */}
						<Autocomplete
							multiple
							id="fixed-tags-demo"
							value={getData.organizer}
							onChange={(event, newValue) => {
								setData.organizer([
									...fixedOptions,
									...newValue.filter((option) => fixedOptions[0].id !== option.id),
								]);
								setError.organizer(null);
							}}
							options={coordinatorList}
							getOptionLabel={(option) => `${option.name} - ${option.id}`}
							renderTags={(tagValue, getTagProps) =>
								tagValue.map((option, index) => (
									<Chip
										label={option.name + ' - ' + option.id}
										{...getTagProps({index})}
										disabled={fixedOptions[0].id === option.id}
									/>
								))
							}
							renderInput={(params) => (
								<TextField
									{...params}
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
							value={getData.duration}
							error={getError.duration !== null}
							onChange={(event) => {
								setData.duration(event.target.value);
								setError.duration(null);
							}}
							helperText={
								getError.duration ||
								'Please provide specific instructions regarding the timing of the event, including the duration and the time at which students are required to report to the venue.'
							}
						/>
						<TextField
							autoComplete="off"
							id="outlined-required"
							label="Venue Here"
							defaultValue=""
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
							Submit Event For Review
						</Button>
					</form>
					<div className="block max-w-sm md:max-w-fit">
						<div className="flex flex-col gap-2 items-center justify-center bg-blue-50 p-3 rounded-md">
							<p className="text-2xl underline">Preview</p>
							<Card
								title={getData.title || "Event's Name Here"}
								subheader={getData.club?.name || "Organiser/Club's Name Here"}
								imageUrl={imageBlob || 'pulseLoading'} // pulseLoading shows the pulse loader
								description={getData.short_description || 'Short Description Here'}
								date={
									(convertDate(getData.start_date) ===
										convertDate(getData.end_date) &&
									convertDate(getData.start_date) !== ''
										? convertDate(getData.start_date)
										: convertDate(getData.start_date) &&
										  convertDate(getData.end_date)
										? convertDate(getData.start_date) +
										  ' - ' +
										  convertDate(getData.end_date)
										: convertDate(getData.start_date)
										? convertDate(getData.start_date)
										: "Event's Date Here") || "Event's Date Here"
								}
								hover={false}></Card>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
