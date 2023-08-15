'use client';
import {useState} from 'react';
import LoginForm from './loginForm';
import LandingNav from './landingNav';
import Footer from './footer';
import PopUp from './popup';
import API from './API';
import {useRouter} from 'next/navigation';
import WebBackdrop from './backdrop';
import useEffect from './useEffect';
import {IconButton} from '@mui/material';
import OtpField from './otp';
import PasswordPage from './passwordUpdate';

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

	return (
		<div className="flex flex-col w-full min-h-screen">
			<LandingNav></LandingNav>
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
					}}></div>
				<div
					className="flex flex-col w-11/12 sm:w-10/12 md:w-5/12 bg-white
      opacity-95 rounded-xl px-8 py-12 shadow-xl z-10 relative">
					{loading ? (
						<div className="shadow rounded-md p-4 w-full h-48">
							<div className="animate-pulse flex">
								<div className="flex-1 space-y-6 py-1">
									<div className="space-y-3">
										<div className="grid grid-cols-3 gap-4">
											<div className="h-8 bg-slate-400 rounded col-span-2"></div>
											<div className="h-8 bg-slate-400 rounded col-span-1"></div>
										</div>
										<div className="h-8 bg-slate-400 rounded"></div>
									</div>
									<div className="grid grid-cols-3 gap-4">
										<div className="h-8 bg-slate-400 rounded col-span-2"></div>
										<div className="h-8 bg-slate-400 rounded col-span-1"></div>
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
									}></WebBackdrop>
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
									showPopUp={handleChange}></PasswordPage>
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
										changetoPassword={changetoPassword}></OtpField>
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
									variant={forgot ? 'forgot' : 'login'}></LoginForm>
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
			<Footer></Footer>
		</div>
	);
}
