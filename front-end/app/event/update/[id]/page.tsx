'use client';
import Create from '../../create';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import API from '../../../API';
import dayjs, {Dayjs} from 'dayjs';
import {
	InterfaceBranch,
	InterfaceClub,
	InterfaceOrganizer,
	InterfaceData,
} from '../../datainterface';

const axios = new API.Axios();

export default function Page(props: {params: {id: number}}) {
	const router = useRouter();
	const [owner, setOwner] = useState<InterfaceOrganizer[]>([]);
	const [setData, getData, getError, setError, sendData] = (() => {
		const [title, setTitle] = useState<string>('');
		const [clubName, setClubName] = useState<{name: string; inputValue?: string}>({
			name: '',
		});
		const [image, setImage] = useState<File>();
		const [startDate, setStartDate] = useState<Dayjs>();
		const [endDate, setEndDate] = useState<Dayjs>();
		const [shortDesc, setShortDesc] = useState<string>('');
		const [longDesc, setLongDesc] = useState<string>('');
		const [branchName, setBranchName] = useState<InterfaceBranch[]>([]);
		const [date, setDate] = useState<string>('');
		const [duration, setDuration] = useState<string>('');
		const [venue, setVenue] = useState<string>('');
		const [coordinator, setCoordinator] = useState<InterfaceOrganizer[]>([]);

		const getData: InterfaceData = {
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
			owner: owner,
		};

		const sendData = () => {
			const organizer = () => {
				const rv: string[] = [];
				for (let i = 0; i < coordinator.length; i++) {
					rv.push(String(coordinator[i].college_id));
				}
				return rv;
			};
			const branch = () => {
				const rv: string[] = [];
				for (let i = 0; i < branchName.length; i++) {
					rv.push(String(branchName[i].pk));
				}
				return rv;
			};
			const data = {
				organizer: organizer(),
				image: image,
				title: title,
				short_description: shortDesc,
				long_description: longDesc,
				club: clubName?.name,
				venue: venue,
				start_date: startDate?.format('YYYY-MM-DD'),
				end_date: endDate?.format('YYYY-MM-DD'),
				date: date,
				time: duration,
				branch: branch(),
			};
			const formData = new FormData();
			// @ts-expect-error
			if (coordinator.length > 1) formData.append('organizer', organizer());
			// @ts-expect-error
			if (typeof image !== 'string') formData.append('image', image);
			if (title !== null || title !== '') formData.append('title', title);
			if (shortDesc !== null || shortDesc !== '')
				formData.append('short_description', shortDesc);
			if (longDesc !== null || longDesc !== '')
				formData.append('long_description', longDesc);
			if (clubName !== null || clubName !== '')
				formData.append('club', JSON.stringify(clubName));
			if (venue !== null || venue !== '') formData.append('venue', venue);
			if (startDate !== null || startDate !== '')
				// @ts-expect-error
				formData.append('start_date', startDate?.format('YYYY-MM-DD'));
			if (endDate !== null || endDate !== '')
				// @ts-expect-error
				formData.append('end_date', endDate?.format('YYYY-MM-DD'));
			if (date !== null || date !== '') formData.append('date', date);
			if (duration !== null || duration !== '') formData.append('time', duration);
			// @ts-expect-error
			if (branchName.length > 0) formData.append('branch', branch());
			return data;
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
	let initial_value: any = {};
	useEffect(() => {
		(async () => {
			const request = await axios.get(
				API.get_url('event:detail', [props.params.id])
			);
			const data = request.data;
			initial_value = data;
			setData.title(data.title);
			// debugger;
			setData.club({name: data.club});
			setData.image(data.image);
			setData.start_date(dayjs(data.start_date));
			setData.end_date(dayjs(data.end_date));
			setData.short_description(data.short_description);
			setData.long_description(data.long_description);
			setData.branch(data.branch);
			setData.date(data.date);
			setData.time(data.time);
			setData.venue(data.venue);
			setData.organizer([...data.organizer, data.owner]);
			setOwner([data.owner]);
		})();
	}, []);

	const submitForm = async () => {
		try {
			const request = await axios.patch(
				API.get_url('event:update', [props.params.id]),
				sendData(),
				{
					'Content-Type': 'multipart/form-data',
				}
			);
			router.push(`details/${request.data.pk}`);
		} catch (error: any) {
			console.error(error.response);
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
