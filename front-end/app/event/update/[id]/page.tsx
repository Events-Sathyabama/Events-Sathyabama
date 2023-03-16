'use client';
import Create from '../../create';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import API from '../../../API';
import {Dayjs} from 'dayjs';

const axios = new API.Axios();

export default function Page(props: {params: {id: number}}) {
	const router = useRouter();

	const [setData, getData, getError, setError, sendData] = (() => {
		const [title, setTitle] = useState<string>('');
		const [clubName, setClubName] = useState<any | null>(null);
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
				club: clubName.name,
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

	useEffect(() => {
		(async () => {
			const request = await axios.get(
				API.get_url('event:detail', [props.params.id])
			);
			const data = request.data;
			console.log(data);

			setData.title = data.title;
			setData.club = data.club;
			setData.image = data.image;
			setData.start_date = data.start_date;
			setData.end_date = data.end_date;
			setData.short_description = data.short_description;
			setData.long_description = data.long_description;
			setData.branch = data.branch;
			setData.date = data.date;
			setData.time = data.time;
			setData.venue = data.venue;
			setData.organizer = data.organizer;
		})();
	}, []);

	const submitForm = async () => {
		try {
			const request = await axios.post(
				API.get_url('event:update', [props.params.id]),
				sendData(),
				{
					'Content-Type': 'multipart/form-data',
				}
			);
			router.push(`details/${request.data.pk}`);
		} catch (error: any) {
			for (let field in setError) {
				console.log(field);
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
			<Create
				getData={getData}
				setData={setData}
				getError={getError}
				setError={setError}
				submitForm={submitForm}
				buttonText={'Update The Event'}
			/>
		</>
	);
}
