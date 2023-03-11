'use client';
import Card from '../home/card';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import {useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

// TODO Fetch Clubs in this way
const clubs = [
	{name: 'Music Club'},
	{name: 'Dance Club'},
	{name: 'ACM'},
	{name: 'Google Developers Student Club'},
	{name: 'Community Development Club'},
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

	return (
		<div className="flex flex-col w-full justify-center items-center gap-4">
			<h1 className="text-2xl text-center underline mt-3">Create your Event</h1>
			<div className="flex flex-row w-full px-4">
				<div className="flex flex-col w-full mx-5 gap-3">
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
							helperText="Double check for typos while entering your club/organiser name in the list above. If you still can't find it, proceed by manually entering your club/organiser name."
						/>
					) : null}
					<Button variant="outlined" component="label" className='w-auto max-w-xl'>
						Upload your Event Poster
						<input hidden accept="image/*" multiple type="file" required />
					</Button>
					<p className='-mt-2 text-xs text-gray-500 ml-3'>Event Poster will be displayed on both the homepage cards and the event's details page.</p>
				</div>
				<div className="hidden lg:block">
					<div className="flex flex-col gap-2 items-center justify-center bg-blue-50 p-3 rounded-md">
						<p className="text-2xl underline">Preview</p>
						<Card
							title={eventName === '' ? 'Event Name Here' : eventName}
							subheader={club === '' ? 'Organiser/Club Name Here' : club}
							imageUrl="/eventPosters/Madhugai.jpg"
							description="Event Short Description Here"
							date="Date of the Event Here"
							learnMoreLink="/create"></Card>
					</div>
				</div>
			</div>
		</div>
	);
}
