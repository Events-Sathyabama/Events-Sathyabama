import React from 'react';
import {MuiOtpInput} from 'mui-one-time-password-input';
import API from './API';
import Popup from './popup';

const axios = new API.Axios();

export default function OtpField(props: any): JSX.Element {
	const [value, setValue] = React.useState<string>('');
	const [popUpMessage, setPopUpMessage] = React.useState('');
	const [errorPopUp, setErrorPopUp] = React.useState(false);
	const handleChange = (newValue: string) => {
		setValue(newValue);
	};

	const handleComplete = async (finalValue: string) => {
		// TODO id is here
		const user_id = localStorage.getItem('user_id');
		try {
			props.setBackdrop(true);
			const response = await axios.verify_otp(finalValue, user_id);
			console.log(finalValue);
			props.changetoPassword();
			localStorage.setItem('otp', finalValue);
			props.setBackdrop(false);
		} catch (error: any) {
			props.setBackdrop(false);
			setPopUpMessage(error.response.data.detail);
			setErrorPopUp(true);
		}
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
		<>
			{errorPopUp === true && (
				<Popup.Error message={popUpMessage} showpopup={() => setErrorPopUp(false)} />
			)}
			<MuiOtpInput
				value={value}
				onChange={handleChange}
				onComplete={handleComplete}
				length={4}
				validateChar={validateChar}
				autoFocus={true}
			/>
		</>
	);
}
