import React from 'react';
import {DateRangeDelimiter, DateRangePicker, LocalizationProvider} from '@material-ui/pickers';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import TextField from '@material-ui/core/TextField';

function DatePicker2() {
	const [selectedDate, handleDateChange] = React.useState([null, null]);

	return (
		// @ts-expect-error
		<LocalizationProvider dateAdapter={DateFnsUtils}>
			<DateRangePicker
				startText='Check-in'
				endText='Check-out'
				// @ts-expect-error
				value={selectedDate}
				// @ts-expect-error
				onChange={date => handleDateChange(date)}
				renderInput={(startProps, endProps) => (
					<>
						<TextField {...startProps} />
						<DateRangeDelimiter> to </DateRangeDelimiter>
						<TextField {...endProps} />
					</>
				)}
			/>
		</LocalizationProvider>
	);
}