'use client';
import useEffect from '@/app/useEffect';
import {Dayjs} from 'dayjs';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import API from '../../API';
import {
	InterfaceBranch,
	InterfaceClub,
	InterfaceCreateEvent,
	InterfaceError,
	InterfaceOrganizer,
} from '../../datainterface';
import Create from '../create';
import Popup from '@/app/popup';
import * as React from 'react';

const axios = new API.Axios();

export default function Page() {
	const router = useRouter();
	const [owner, setOwner] = useState<InterfaceOrganizer>({
		name: '-',
		college_id: '-',
		role: '',
		pk: -1,
	});
	const [setData, getData, getError, setError, sendData] = (() => {
		const [title, setTitle] = useState<string>('');
		const [totalStrength, setTotalStrength] = useState<number>(50);
		const [fcfs, setFcfs] = useState<boolean>(true);
		const [clubName, setClubName] = useState<InterfaceClub>({
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

		const getData: InterfaceCreateEvent = {
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
			fcfs: fcfs,
			total_strength: totalStrength,
		};

		const sendData = () => {
			const organizer = () => {
				const rv = [];
				for (let i = 0; i < coordinator.length; i++) {
					if (coordinator[i].college_id !== owner.college_id) {
						rv.push(coordinator[i].pk);
					}
				}
				return rv;
			};
			const branch = () => {
				const rv: number[] = [];
				for (let i = 0; i < branchName.length; i++) {
					rv.push(branchName[i].pk);
				}
				return rv;
			};

			return {
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
				fcfs: fcfs,
				total_strength: totalStrength,
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
			fcfs: setFcfs,
			total_strength: setTotalStrength,
		};

		const [titleError, setTitleError] = useState<null | string>(null);
		const [fcfsError, setFcfsError] = useState<null | string>(null);
		const [totalStrengthError, setTotalStrengthError] = useState<null | string>(
			null,
		);
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

		const getError: InterfaceError = {
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
			fcfs: fcfsError,
			total_strength: totalStrengthError,
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
			fcfs: setFcfsError,
			total_strength: setTotalStrengthError,
		};
		return [setData, getData, getError, setError, sendData];
	})();
	const [PopupMessage, setPopupMessage] = useState<string>('');
	const [sPopup, setSPopup] = useState<boolean>(false);
	const [fPopup, setFPopup] = useState<boolean>(false);
	const [errorSubmit, setErrorSubmit] = useState<boolean>(false);
	const submitForm = async () => {
		try {
			setErrorSubmit(false);
			console.log(sendData());
			const request = await axios.post(API.get_url('event:create'), sendData(), {
				'Content-Type': 'multipart/form-data',
			});
			router.push(`/details/${request.data.pk}`);
		} catch (error: any) {
			console.error(error);
			setErrorSubmit(true);
			if (error.message === 'Network Error') {
				setPopupMessage('Check your Internet Connection!!');
				setSPopup(false);
				setFPopup(true);
			}
			for (let field in setError) {
				setError[field](null);
			}
			for (let field in error.response.data) {
				if (setError.hasOwnProperty(field))
					setError[field](API.extract_error(error.response.data[field]));
			}
			setPopupMessage(error?.response?.data?.detail || 'Fix the errors!!');
			setFPopup(true);
			window.scrollTo({
				top: 0,
				behavior: 'smooth', // This makes the scrolling smooth
			});
		}
	};
	const [Loader, setLoader] = useState(0);

	useEffect(
		() => {
			const obj = {
				name: localStorage.getItem('name') || '',
				college_id: localStorage.getItem('id') || '',
				role: localStorage.getItem('role_name') || '',
				pk: API.jwt(localStorage.getItem('access')).user_id || -1,
			};
			setOwner(obj);
			setData.organizer([obj]);
		},
		[],
		setLoader,
	);

	// useEffect(() => {
	// 	setData.title('This is Test Title');
	// 	setData.organizer([
	// 		{name: 'Abhinav', college_id: '40110122', role: 'Teacher', pk: 2},
	// 	]);
	// 	setData.short_description('This is short');
	// 	setData.club({
	// 		name: 'SIST',
	// 	});
	// }, []);

	return (
		<>
			{sPopup === true && <Popup.Success message={PopupMessage} showpopup={setSPopup} />}
			{fPopup === true && <Popup.Error message={PopupMessage} showpopup={setFPopup} />}
			<Create
				errorState={errorSubmit}
				getData={getData}
				setData={setData}
				getError={getError}
				setError={setError}
				submitForm={submitForm}
				buttonText={'Submit Event For Review'}
				setLoader={setLoader}
			/>
		</>
	);
}
