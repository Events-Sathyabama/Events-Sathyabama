import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog(props: any) {
	return (
		<Dialog
			open={props.open}
			TransitionComponent={Transition}
			keepMounted
			onClose={props.handleClose}
			aria-describedby="alert-dialog-slide-description">
			<DialogTitle>
				Are you sure you want to apply for{' '}
				<span className="text-[#007efd]">{props.title}</span>?
			</DialogTitle>
			<DialogActions>
				<Button variant="outlined" color="error" onClick={props.handleClose}>
					Cancel
				</Button>
				{props.children}
			</DialogActions>
		</Dialog>
	);
}
