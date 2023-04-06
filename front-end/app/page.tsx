'use client';
import Link from 'next/link';
import {useState} from 'react';
import LoginForm from './loginForm';
import LandingNav from './landingNav';
import Footer from './footer';
import PopUp from './popup';
import API from './API';
import {useRouter} from 'next/navigation';
import WebBackdrop from './backdrop';
import useEffect from './useEffect';
import ApiLoader from './apiLoader';

export default function LoginPage(): JSX.Element {
	const [loading, setLoading] = useState(true);
	const [fPopUp, setFPopUp] = useState(false);
	const [popUpMessage, setPopUpMessage] = useState('');
	const [validBackdrop, setValidBackdrop] = useState(false);
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

	return (
		<div className="flex flex-col w-full min-h-screen">
			<LandingNav></LandingNav>

			<div className="flex flex-col flex-grow w-full h-full justify-center items-center relative">
				{fPopUp ? (
					<div className="right-5 absolute z-10 top-0">
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
							{/* TODO Login Backdrop Work Here */}
							{/* <WebBackdrop message="Verifying login status..."></WebBackdrop> */}
							{validBackdrop ? (
								<WebBackdrop message="Verifying Credentials..."></WebBackdrop>
							) : null}
							<h1 className="font-roboto text-4xl font-semibold">Sign-in</h1>
							<LoginForm
								setBackdrop={(state: boolean) => setValidBackdrop(state)}
								showPopUp={handleChange}></LoginForm>
							<Link href="/forgot" className="mt-2">
								<span className="text-blue-600 font-roboto text-sm hover:underline">
									Forgot Password?
								</span>
							</Link>
						</>
					)}
				</div>
			</div>
			<Footer></Footer>
		</div>
	);
}
