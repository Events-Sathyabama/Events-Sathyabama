// noinspection PointlessBooleanExpressionJS

'use client';
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
							{!forgot && !otp ? (
								<span
									onClick={handleForgot}
									className="text-blue-600 mt-2 cursor-pointer font-roboto text-sm hover:underline">
									Forgot Password?
								</span>
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
