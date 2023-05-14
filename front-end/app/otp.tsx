import React from 'react';
import {MuiOtpInput} from 'mui-one-time-password-input';

export default function OtpField(props: any): JSX.Element {
	const [value, setValue] = React.useState<string>('');

	const handleChange = (newValue: string) => {
		setValue(newValue);
	};

	const handleComplete = (finalValue: string) => {
		// TODO do your api call here
		props.setBackdrop(true);
		console.log(finalValue);
		setTimeout(() => {
			props.setBackdrop(false);
			// if correct move to password filling page
			props.changetoPassword();
			//else show error
			// props.showPopUp(true, 'Invalid OTP, Please try again!');
		}, 3000);
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
