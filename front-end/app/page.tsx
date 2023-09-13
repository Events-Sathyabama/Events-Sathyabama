// noinspection PointlessBooleanExpressionJS

'use client';
import {Button} from '@mui/material';
import {IconButton} from '@mui/material';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import API from './API';
import WebBackdrop from './backdrop';
import Footer from './footer';
import LandingNav from './landingNav';
import LoginForm from './loginForm';
import OtpField from './otp';
import PasswordPage from './passwordUpdate';
import PopUp from './popup';
import useEffect from './useEffect';

const axios = new API.Axios();

export default function LoginPage(): JSX.Element {
	const [loading, setLoading] = useState(true);
	const [fPopUp, setFPopUp] = useState(false);
	const [popUpMessage, setPopUpMessage] = useState('');
	const [validBackdrop, setValidBackdrop] = useState(false);
	const [userMail, setUserMail] = useState('');
	const [otp, setOtpPage] = useState(false);
	const [passwordPage, setPasswordPage] = useState(false);

	const router = useRouter();
	useEffect(() => {
		if (API.is_logged_in()) {
			router.push('home/upcoming');
		}
		setLoading(false);
	}, []);

	function handleChange(change = true, message = 'Invalid Credentials') {
		setFPopUp(change);
		if (message === 'Please Provide a valid Login Credentials') {
			setPopUpMessage('Invalid Credentials, try again!');
		} else {
			setPopUpMessage(message);
		}
	}

	const [forgot, setForgot] = useState(false);

	function handleForgot() {
		setForgot(true);
	}

	function changetoOtp() {
		setOtpPage(true);
	}

	function changetoPassword() {
		setPasswordPage(true);
	}

	const [timer, setTimer] = useState(0);
	const [retryCount, setRetryCount] = useState(0);

	useEffect(() => {
		if (timer > 0) {
			const timerInterval = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);

			return () => clearInterval(timerInterval);
		}
	}, [timer]);

	const [otpResend, setOTPResend] = useState('');

	const handleResend = async () => {
		// TODO axios call here bro
		// Show Success Popup after sending otp
		setOTPResend('Sending');
		const url = API.get_url('user:send_otp');
		const id = localStorage.getItem('user_id');
		const response = await axios.send_otp(id);
		console.log(response.status);

		if (response.status === 200) {
			setOTPResend('E-mail sent, ');
		} else {
			setOTPResend('Something went wrong, ');
		}

		if (retryCount === 0) {
			setTimer(30);
		} else if (retryCount === 1) {
			setTimer(60);
		} else if (retryCount >= 2) {
			setTimer(300);
		}

		setRetryCount((prevCount) => prevCount + 1);
	};

	const formatTime = (timeInSeconds: any) => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;

		if (minutes === 0) {
			return `${seconds}s`;
		} else {
			return `${minutes}m ${seconds}s`;
		}
	};

	const Credentials = [
		{password: 'admin', index: 0},
		{password: 'admin', index: 1},
		{password: 'admin', index: 2},
		{password: 'admin', index: 3},
		{password: 'admin', index: 4},
	];

	const Login = async (key: number) => {
		setValidBackdrop(true);
		const response = await axios.login(key, Credentials[key].password);
		if (typeof window !== 'undefined') {
			router.push('/home/upcoming');
		}
	};

	return (
		<div className="flex flex-col w-full min-h-screen">
			<LandingNav />
			<div className="flex flex-col flex-grow w-full h-full justify-center items-center relative">
				{fPopUp ? (
					<div className="right-5 absolute z-50 top-0">
						<PopUp.Error message={popUpMessage} showpopup={handleChange} />
					</div>
				) : (
					<></>
				)}
				<div
					className="absolute top-0 left-0 w-full h-full z-0 bg-center"
					style={{
						backgroundImage: "url('/college.svg')",
						filter: 'blur(5px)',
					}}
				/>
				<div
					className="flex flex-col w-11/12 sm:w-10/12 md:w-5/12 bg-white
      opacity-95 rounded-xl px-8 py-12 shadow-xl z-10 relative">
					{loading ? (
						<div className="shadow rounded-md p-4 w-full h-48">
							<div className="animate-pulse flex">
								<div className="flex-1 space-y-6 py-1">
									<div className="space-y-3">
										<div className="grid grid-cols-3 gap-4">
											<div className="h-8 bg-slate-400 rounded col-span-2" />
											<div className="h-8 bg-slate-400 rounded col-span-1" />
										</div>
										<div className="h-8 bg-slate-400 rounded" />
									</div>
									<div className="grid grid-cols-3 gap-4">
										<div className="h-8 bg-slate-400 rounded col-span-2" />
										<div className="h-8 bg-slate-400 rounded col-span-1" />
									</div>
								</div>
							</div>
						</div>
					) : (
						<>
							{validBackdrop ? (
								<WebBackdrop
									message={
										passwordPage
											? 'Redirecting to Home...'
											: otp
											? 'Validating OTP...'
											: forgot
											? 'Sending E-mail...'
											: 'Verifying Credentials...'
									}
								/>
							) : null}
							<div className="flex flex-row w-full items-center gap-3">
								{forgot && !otp ? (
									<IconButton
										className="cursor-pointer p-1 rounded-md"
										onClick={() => setForgot(false)}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-8 h-8 text-black">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
											/>
										</svg>
									</IconButton>
								) : (
									<></>
								)}
								<h1 className="font-roboto text-4xl font-semibold">
									{passwordPage
										? 'Change Password'
										: otp
										? "Verifying it's you!"
										: forgot
										? 'Forgot Password?'
										: 'Sign-in'}
								</h1>
							</div>
							{passwordPage === true && (
								<PasswordPage
									setBackdrop={(state: boolean) => setValidBackdrop(state)}
									showPopUp={handleChange}
								/>
							)}
							{otp && !passwordPage ? (
								<div className="flex flex-col mt-1 gap-3">
									<p>
										Enter the <span className="font-medium">OTP</span> sent to{' '}
										<span className="text-[#017efc]">{userMail}</span>
									</p>
									<OtpField
										setBackdrop={(state: boolean) => setValidBackdrop(state)}
										showPopUp={handleChange}
										changetoPassword={changetoPassword}
									/>
									<button
										onClick={handleResend}
										disabled={timer > 0 || otpResend === 'Sending'}
										className={`text-blue-600 mt-2 w-max cursor-pointer font-roboto text-sm ${
											timer > 0 || otpResend === 'Sending'
												? 'opacity-50 cursor-wait'
												: 'hover:underline'
										}`}
										id="resendButton">
										{timer > 0
											? `${otpResend}Resend OTP in ${formatTime(timer)}`
											: otpResend === 'Sending'
											? 'Sending...'
											: 'Resend OTP'}
									</button>
								</div>
							) : (
								<></>
							)}
							{!otp ? (
								<LoginForm
									setBackdrop={(state: boolean) => setValidBackdrop(state)}
									showPopUp={handleChange}
									userMail={setUserMail}
									changetoOtp={changetoOtp}
									variant={forgot ? 'forgot' : 'login'}
								/>
							) : (
								<></>
							)}
							<span className="w-full text-center my-3">(or)</span>
							<div className="flex flex-col w-full gap-2 mb-3 mt-1 rounded-md">
								<h1 className="font-roboto text-4xl font-semibold">
									Take a Demo as
								</h1>
								<div className="flex flex-row flex-wrap w-full gap-2">
									<Button
										endIcon={
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="19"
												height=""
												viewBox="0 0 256 256">
												<path
													fill="currentColor"
													d="m226.53 56.41l-96-32a8 8 0 0 0-5.06 0l-96 32A8 8 0 0 0 24 64v80a8 8 0 0 0 16 0V75.1l33.59 11.19a64 64 0 0 0 20.65 88.05c-18 7.06-33.56 19.83-44.94 37.29a8 8 0 1 0 13.4 8.74C77.77 197.25 101.57 184 128 184s50.23 13.25 65.3 36.37a8 8 0 0 0 13.4-8.74c-11.38-17.46-27-30.23-44.94-37.29a64 64 0 0 0 20.65-88l44.12-14.7a8 8 0 0 0 0-15.18ZM176 120a48 48 0 1 1-86.65-28.45l36.12 12a8 8 0 0 0 5.06 0l36.12-12A47.89 47.89 0 0 1 176 120Zm-48-32.43L57.3 64L128 40.43L198.7 64Z"
												/>
											</svg>
										}
										onClick={() => {
											Login(0);
										}}
										variant="contained"
										className=" bg-[#057bf3]">
										Student
									</Button>
									<Button
										endIcon={
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height=""
												viewBox="0 0 256 256">
												<path
													fill="currentColor"
													d="M216 42H40a14 14 0 0 0-14 14v144a14 14 0 0 0 14 14h13.39a6 6 0 0 0 5.42-3.43a50 50 0 0 1 90.38 0a6 6 0 0 0 5.42 3.43H216a14 14 0 0 0 14-14V56a14 14 0 0 0-14-14ZM78 144a26 26 0 1 1 26 26a26 26 0 0 1-26-26Zm140 56a2 2 0 0 1-2 2h-57.73a62.34 62.34 0 0 0-31.48-27.61a38 38 0 1 0-45.58 0A62.34 62.34 0 0 0 49.73 202H40a2 2 0 0 1-2-2V56a2 2 0 0 1 2-2h176a2 2 0 0 1 2 2ZM198 80v96a6 6 0 0 1-6 6h-16a6 6 0 0 1 0-12h10V86H70v10a6 6 0 0 1-12 0V80a6 6 0 0 1 6-6h128a6 6 0 0 1 6 6Z"
												/>
											</svg>
										}
										onClick={() => {
											Login(1);
										}}
										variant="contained"
										className=" bg-[#057bf3]">
										Teacher
									</Button>
									<Button
										endIcon={
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="19"
												height=""
												viewBox="0 0 24 24">
												<path
													fill="currentColor"
													d="M16.5 15.5c1.72 0 3.75.8 4 1.28v.72h-8v-.72c.25-.48 2.28-1.28 4-1.28m0-1.5c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75M9 13c-2.33 0-7 1.17-7 3.5V19h7v-1.5H3.5v-1c0-.63 2.79-2.16 6.32-2a5.12 5.12 0 0 1 1.55-1.25A12.28 12.28 0 0 0 9 13m0-6.5A1.5 1.5 0 1 1 7.5 8A1.5 1.5 0 0 1 9 6.5M9 5a3 3 0 1 0 3 3a3 3 0 0 0-3-3m7.5 3.5a1 1 0 1 1-1 1a1 1 0 0 1 1-1m0-1.5A2.5 2.5 0 1 0 19 9.5A2.5 2.5 0 0 0 16.5 7Z"
												/>
											</svg>
										}
										onClick={() => {
											Login(2);
										}}
										variant="contained"
										className=" bg-[#057bf3]">
										HOD
									</Button>
									<Button
										endIcon={
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height=""
												viewBox="0 0 20 20">
												<path
													fill="currentColor"
													d="M10 9.25c-2.27 0-2.73-3.44-2.73-3.44C7 4.02 7.82 2 9.97 2c2.16 0 2.98 2.02 2.71 3.81c0 0-.41 3.44-2.68 3.44zm0 2.57L12.72 10c2.39 0 4.52 2.33 4.52 4.53v2.49s-3.65 1.13-7.24 1.13c-3.65 0-7.24-1.13-7.24-1.13v-2.49c0-2.25 1.94-4.48 4.47-4.48z"
												/>
											</svg>
										}
										onClick={() => {
											Login(3);
										}}
										variant="contained"
										className=" bg-[#057bf3]">
										Dean
									</Button>
									<Button
										endIcon={
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="19"
												height=""
												viewBox="0 0 24 24">
												<path
													fill="currentColor"
													d="M12 23C6.443 21.765 2 16.522 2 11V5l10-4l10 4v6c0 5.524-4.443 10.765-10 12ZM4 6v5a10.58 10.58 0 0 0 8 10a10.58 10.58 0 0 0 8-10V6l-8-3Z"
												/>
												<circle cx="12" cy="8.5" r="2.5" fill="currentColor" />
												<path
													fill="currentColor"
													d="M7 15a5.782 5.782 0 0 0 5 3a5.782 5.782 0 0 0 5-3c-.025-1.896-3.342-3-5-3c-1.667 0-4.975 1.104-5 3Z"
												/>
											</svg>
										}
										onClick={() => {
											Login(4);
										}}
										variant="contained"
										className=" bg-[#057bf3]">
										Vice-Chancellor
									</Button>
								</div>
							</div>
							{!forgot && !otp ? (
								<div className="flex flex-row mt-2 justify-between items-center w-full">
									<span
										onClick={handleForgot}
										className="text-blue-600 w-max cursor-pointer font-roboto text-sm hover:underline">
										Forgot Password?
									</span>
									<a href="https://youtu.be/iLgYvN-qO4c" target="_blank">
										<span className="text-blue-600 w-max cursor-pointer font-roboto text-sm hover:underline mr-1">
											Watch Demo Video
										</span>
									</a>
								</div>
							) : (
								<></>
							)}
						</>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
}
