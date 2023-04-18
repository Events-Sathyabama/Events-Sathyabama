'use client';
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function WebBackdrop(props: {message: string; id?: string}) {
	return (
		<Backdrop
			sx={{
				backgroundColor: '#202124',
				color: '#fff',
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}
			id={props.id || 'backdrop'}
			open={true}
			className="flex flex-col justify-center items-center gap-4 p-3">
			<p className="text-2xl text-center">{props.message}</p>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
}
