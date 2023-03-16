'use client';
import Create from '../create';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import API from '../../API';
import {Dayjs} from 'dayjs';

const axios = new API.Axios();

export default function Page() {
	const router = useRouter();

	const [setData, getData, getError, setError, sendData] = (() => {
		const [title, setTitle] = useState<string>('');
		const [clubName, setClubName] = useState<{name: string; id: string} | null>();
		const [image, setImage] = useState<File | null>(null);
		const [startDate, setStartDate] = useState<Dayjs | null>(null);
		const [endDate, setEndDate] = useState<Dayjs | null>(null);
		const [shortDesc, setShortDesc] = useState<string>('');
		const [longDesc, setLongDesc] = useState<string>('');
		const [branchName, setBranchName] = useState<string>('');
		const [date, setDate] = useState<string>('');
		const [duration, setDuration] = useState<string>('');
		const [venue, setVenue] = useState<string>('');
		const [coordinator, setCoordinator] = useState<
			{name: string; id: string}[] | any
		>([]);
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
			time: duration,
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
				club: clubName?.name,
				venue: venue,
				start_date: startDate,
				end_date: startDate,
				date: date,
				time: duration,
				branch: branchName,
			};
		};
		const setData: {[x: string]: Function} = {
			title: setTitle,
			club: setClubName,
			image: setImage,
			start_date: setStartDate,
			end_date: setEndDate,
			short_description: setShortDesc,
			long_description: setLongDesc,
			branch: setBranchName,
			date: setDate,
			time: setDuration,
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
			time: durationError,
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
			time: setDurationError,
			venue: setVenueError,
			organizer: setCoordinatorError,
		};
		return [setData, getData, getError, setError, sendData];
	})();

	const submitForm = async () => {
		try {
			const request = await axios.post(API.get_url('event:create'), sendData(), {
				'Content-Type': 'multipart/form-data',
			});
			router.push(`details/${request.data.pk}`);
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
		<Create
			getData={getData}
			setData={setData}
			getError={getError}
			setError={setError}
			submitForm={submitForm}
			buttonText={'Submit Event For Review'}
		/>
	);
}
