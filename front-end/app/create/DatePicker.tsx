import React, {useState} from 'react';
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


function DatePicker(props: {setStartDate: Function, setEndDate: Function}) {
	const minSelectableDate = dayjs().startOf('day');
	const [showEnd, setShowEnd] = useState(false);
	const [minEndDate, setMinEndDate] = useState();
	let selectedDate;
	const handleDateChange = (date: any) => {
		setShowEnd(true);
		selectedDate = new Date(date);
		setMinEndDate(date);
		const day = selectedDate.getDate();
		const month = selectedDate.toLocaleDateString('default', {month: 'short'}); // January is 0
		const year = selectedDate.getFullYear().toString().slice(-2);
		props.setStartDate(day + ' ' + month.substring(0, 3) + ' \'' + year);
	};

	const handleEndDateChange = (date: any) => {
		selectedDate = new Date(date);
		const day = selectedDate.getDate();
		const month = selectedDate.toLocaleDateString('default', {month: 'short'}); // January is 0
		const year = selectedDate.getFullYear().toString().slice(-2);
		props.setEndDate(day + ' ' + month.substring(0, 3) + ' \'' + year);
	};
	return <LocalizationProvider dateAdapter={AdapterDayjs}>
		<div className='flex flex-col sm:flex-row w-full gap-2 sm:gap-5'>
			<div className='flex flex-col gap-1'>
				<p className='ml-1'>Your Event's Start Date</p>
				<MobileDatePicker
					className='w-fit'
					onChange={handleDateChange}
					minDate={minSelectableDate}
					disablePast
					format='DD/MM/YY'
				/>
			</div>
			<div className='flex flex-col gap-1'>
				<p className={showEnd ? '' : 'text-gray-300'}>
					Your Event's End Date
				</p>
				<MobileDatePicker
					disabled={!showEnd}
					className='w-fit'
					disablePast
					minDate={minEndDate}
					onChange={handleEndDateChange}
					format='DD/MM/YY'
				/>
			</div>
		</div>
		<p className='-mt-3 text-xs text-gray-500 ml-3'>
			Date fields are optional. If it is a single day event, please specify
			the same date for the start and end date.
		</p>
	</LocalizationProvider>;
}

export default DatePicker;