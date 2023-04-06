import React from 'react';
import Image from 'next/image';
import {CircularProgress} from '@mui/material';

export default function ApiLoader(props: {
	state: number;
	message?: string;
	skelton?: JSX.Element;
	className?: string;
}) {
	const prevScrollPosition = React.useRef(0);
	React.useEffect(() => {
		if (props.state === 200) {
			// Scroll to the previous scroll position
			window.scrollTo(0, prevScrollPosition.current);
			// Show the scroll
			document.body.style.overflow = '';
		} else {
			// store the prev scroll position
			prevScrollPosition.current =
				window.pageYOffset ||
				document.documentElement.scrollTop ||
				document.body.scrollTop ||
				0;
			// Scroll to the top
			window.scrollTo(0, 0);
			// Hide the scroll
			document.body.style.overflow = 'hidden';
		}
	}, [props.state]);

	const loading_screen: {[key: number | string]: JSX.Element} = {
		0: (
			<>
				{/* Add your pulse loader here for different pages */}
				{props.skelton ? props.skelton : <CircularProgress />}
			</>
		),
		200: <></>,
		600: <span className="text-2lg">No Internet</span>,
		404: (
			<div className="flex flex-col justify-center items-center w-96 h-[58vh]">
				<Image src="/eventsNotFound.svg" width={500} height={500} alt=""></Image>
				<p className="text-2xl font-light text-blue-400 mt-4">No events found!!</p>
			</div>
		),
		401: <span>Unauthorised 401</span>,
		default: <span className="text-2xl">Something went Wrong {props.state}</span>,
	};

	return (
		<>
			{props.state !== 200 && (
				<div
					className={
						(props.className ? props.className : '') +
						` fixed w-screen h-screen bg-white z-20 flex justify-center items-center`
					}>
					{loading_screen.hasOwnProperty(props.state)
						? loading_screen[props.state]
						: loading_screen['default']}
				</div>
			)}
		</>
	);
}
