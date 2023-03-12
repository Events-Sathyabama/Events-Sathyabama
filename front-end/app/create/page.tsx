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

	const fixedOptions = [top100Films[6]];
	const [coval, setCoval] = React.useState([...fixedOptions, top100Films[13]]);
	return (
		<div className="flex flex-col w-full justify-center items-center gap-4 px-2">
			<h1 className="text-2xl text-center underline mt-3">Create/Edit your Event</h1>
			<div className="flex flex-col md:flex-row w-full sm:px-4 gap-2 items-center md:items-start">
				<div className="flex flex-col w-full mx-5 gap-4 max-w-sm md:max-w-full">
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
						}}
						options={top100Films}
						getOptionLabel={(option) => option.title}
						renderTags={(tagValue, getTagProps) =>
							tagValue.map((option, index) => (
								<Chip
									label={option.title}
									{...getTagProps({index})}
									disabled={fixedOptions.indexOf(option) !== -1}
								/>
							))
						}
						renderInput={(params) => (
							<TextField {...params} label="Fixed tag" placeholder="Favorites" />
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
				</div>
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

// TODO Fetch Coordinators in this way
const top100Films = [
	{title: 'The Shawshank Redemption', year: 1994},
	{title: 'The Godfather', year: 1972},
	{title: 'The Godfather: Part II', year: 1974},
	{title: 'The Dark Knight', year: 2008},
	{title: '12 Angry Men', year: 1957},
	{title: "Schindler's List", year: 1993},
	{title: 'Pulp Fiction', year: 1994},
	{
		title: 'The Lord of the Rings: The Return of the King',
		year: 2003,
	},
	{title: 'The Good, the Bad and the Ugly', year: 1966},
	{title: 'Fight Club', year: 1999},
	{
		title: 'The Lord of the Rings: The Fellowship of the Ring',
		year: 2001,
	},
	{
		title: 'Star Wars: Episode V - The Empire Strikes Back',
		year: 1980,
	},
	{title: 'Forrest Gump', year: 1994},
	{title: 'Inception', year: 2010},
	{
		title: 'The Lord of the Rings: The Two Towers',
		year: 2002,
	},
	{title: "One Flew Over the Cuckoo's Nest", year: 1975},
	{title: 'Goodfellas', year: 1990},
	{title: 'The Matrix', year: 1999},
	{title: 'Seven Samurai', year: 1954},
	{
		title: 'Star Wars: Episode IV - A New Hope',
		year: 1977,
	},
	{title: 'City of God', year: 2002},
	{title: 'Se7en', year: 1995},
	{title: 'The Silence of the Lambs', year: 1991},
	{title: "It's a Wonderful Life", year: 1946},
	{title: 'Life Is Beautiful', year: 1997},
	{title: 'The Usual Suspects', year: 1995},
	{title: 'Léon: The Professional', year: 1994},
	{title: 'Spirited Away', year: 2001},
	{title: 'Saving Private Ryan', year: 1998},
	{title: 'Once Upon a Time in the West', year: 1968},
	{title: 'American History X', year: 1998},
	{title: 'Interstellar', year: 2014},
	{title: 'Casablanca', year: 1942},
	{title: 'City Lights', year: 1931},
	{title: 'Psycho', year: 1960},
	{title: 'The Green Mile', year: 1999},
	{title: 'The Intouchables', year: 2011},
	{title: 'Modern Times', year: 1936},
	{title: 'Raiders of the Lost Ark', year: 1981},
	{title: 'Rear Window', year: 1954},
	{title: 'The Pianist', year: 2002},
	{title: 'The Departed', year: 2006},
	{title: 'Terminator 2: Judgment Day', year: 1991},
	{title: 'Back to the Future', year: 1985},
	{title: 'Whiplash', year: 2014},
	{title: 'Gladiator', year: 2000},
	{title: 'Memento', year: 2000},
	{title: 'The Prestige', year: 2006},
	{title: 'The Lion King', year: 1994},
	{title: 'Apocalypse Now', year: 1979},
	{title: 'Alien', year: 1979},
	{title: 'Sunset Boulevard', year: 1950},
	{
		title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
		year: 1964,
	},
	{title: 'The Great Dictator', year: 1940},
	{title: 'Cinema Paradiso', year: 1988},
	{title: 'The Lives of Others', year: 2006},
	{title: 'Grave of the Fireflies', year: 1988},
	{title: 'Paths of Glory', year: 1957},
	{title: 'Django Unchained', year: 2012},
	{title: 'The Shining', year: 1980},
	{title: 'WALL·E', year: 2008},
	{title: 'American Beauty', year: 1999},
	{title: 'The Dark Knight Rises', year: 2012},
	{title: 'Princess Mononoke', year: 1997},
	{title: 'Aliens', year: 1986},
	{title: 'Oldboy', year: 2003},
	{title: 'Once Upon a Time in America', year: 1984},
	{title: 'Witness for the Prosecution', year: 1957},
	{title: 'Das Boot', year: 1981},
	{title: 'Citizen Kane', year: 1941},
	{title: 'North by Northwest', year: 1959},
	{title: 'Vertigo', year: 1958},
	{
		title: 'Star Wars: Episode VI - Return of the Jedi',
		year: 1983,
	},
	{title: 'Reservoir Dogs', year: 1992},
	{title: 'Braveheart', year: 1995},
	{title: 'M', year: 1931},
	{title: 'Requiem for a Dream', year: 2000},
	{title: 'Amélie', year: 2001},
	{title: 'A Clockwork Orange', year: 1971},
	{title: 'Like Stars on Earth', year: 2007},
	{title: 'Taxi Driver', year: 1976},
	{title: 'Lawrence of Arabia', year: 1962},
	{title: 'Double Indemnity', year: 1944},
	{
		title: 'Eternal Sunshine of the Spotless Mind',
		year: 2004,
	},
	{title: 'Amadeus', year: 1984},
	{title: 'To Kill a Mockingbird', year: 1962},
	{title: 'Toy Story 3', year: 2010},
	{title: 'Logan', year: 2017},
	{title: 'Full Metal Jacket', year: 1987},
	{title: 'Dangal', year: 2016},
	{title: 'The Sting', year: 1973},
	{title: '2001: A Space Odyssey', year: 1968},
	{title: "Singin' in the Rain", year: 1952},
	{title: 'Toy Story', year: 1995},
	{title: 'Bicycle Thieves', year: 1948},
	{title: 'The Kid', year: 1921},
	{title: 'Inglourious Basterds', year: 2009},
	{title: 'Snatch', year: 2000},
	{title: '3 Idiots', year: 2009},
	{title: 'Monty Python and the Holy Grail', year: 1975},
];
