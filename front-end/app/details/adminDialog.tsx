import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {TransitionProps} from '@mui/material/transitions';
import * as React from 'react';
import {InterfaceData} from '../datainterface';
import AdminTabs from './adminTabs';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function AdminDialog(props: {
	adminClose: any;
	showAdmin: any;
	eventData: InterfaceData;
	href: string;
	showSuccessPopup: Function;
	showFailurePopup: Function;
	isOrganizer: boolean;
	sPopUp: {show: Function; message: Function};
	fPopUp: {show: Function; message: Function};
}) {
	const handleClose = () => {
		props.adminClose();
	};

	return (
		<Dialog
			fullScreen
			open={props.showAdmin}
			onClose={handleClose}
			TransitionComponent={Transition}>
			<AppBar sx={{position: 'relative'}}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleClose}
						aria-label="close">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</IconButton>
					<Typography
						className="w-full h-8 truncate select-none"
						sx={{ml: 2, flex: 1}}
						variant="h6"
						component="div">
						Event Admin Panel - {props.eventData.title}
					</Typography>
				</Toolbar>
			</AppBar>
			<List>
				<AdminTabs
					eventData={props.eventData}
					showSuccessPopup={() => props.showSuccessPopup()}
					showFailurePopup={() => props.showFailurePopup()}
					isOrganizer={props.isOrganizer}
					href={props.href}
					sPopUp={props.sPopUp}
					fPopUp={props.fPopUp}
				/>
			</List>
		</Dialog>
	);
}
