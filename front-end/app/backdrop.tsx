import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function LoginBackdrop() {
	const [open, setOpen] = React.useState(true);
	const handleClose = () => {
		setOpen(false);
	};
	const handleToggle = () => {
		setOpen(!open);
	};

	return (
		<div className="flex">
			<Button onClick={handleToggle}>Show backdrop</Button>
			<Backdrop
				sx={{
					backgroundColor: '#202124',
					color: '#fff',
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				open={open}
				onClick={handleClose}
				className="flex flex-col justify-center items-center gap-4 p-3">
				<p className="text-2xl text-center">Verifying login status...</p>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
}
