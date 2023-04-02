import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function WebBackdrop(props: {message: string; id?: string}) {
	return (
		<div
			className="z-50 top-0 left-0 fixed w-screen h-screen bg-[#202124] flex flex-col gap-4 text-white font-bold justify-center items-center text-lg tracking-wider"
			id={props.id || 'backdrop'}>
			{' '}
			{props.message}
			<div className="flex items-center justify-center">
				<div
					className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
					role="status"></div>
			</div>
		</div>
	);

	// return (
	// 	<Backdrop
	// 		sx={{
	// 			backgroundColor: '#202124',
	// 			color: '#fff',
	// 			zIndex: (theme) => theme.zIndex.drawer + 1,
	// 		}}
	// 		open={true}
	// 		className="flex flex-col justify-center items-center gap-4 p-3">
	// 		<p className="text-2xl text-center">{props.message}</p>
	// 		<CircularProgress color="inherit" />
	// 	</Backdrop>
	// )
}
