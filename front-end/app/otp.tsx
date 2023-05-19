import React from 'react';
import {MuiOtpInput} from 'mui-one-time-password-input';
import API from './API';

const axios = new API.Axios();

export default function OtpField(props: any): JSX.Element {
	const [value, setValue] = React.useState<string>('');

	const handleChange = (newValue: string) => {
		setValue(newValue);
	};

	const handleComplete = async (finalValue: string) => {
		// TODO do your api call here
		const response = await axios.verify_otp(finalValue);
		props.setBackdrop(true);
		console.log(finalValue);
		props.setBackdrop(false);
		props.changetoPassword();
	};

	const validateChar = (value: any, index: any) => {
		return (
			value === '' ||
			value === '\b' ||
			value === '\x7f' ||
			(!isNaN(value) && value.trim() !== '')
		);
	};

	return (
		<MuiOtpInput
			value={value}
			onChange={handleChange}
			onComplete={handleComplete}
			length={4}
			validateChar={validateChar}
			autoFocus={true}
		/>
	);
}
