import React from 'react';
import {Button} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {AcceptDeny} from './organiserDialog';
import {LoadingButton} from '@mui/lab';

const ViewReport = (props: {
	reportLink: string | undefined;
	view: 'report' | 'cert';
}) => {
	const [open, setOpen] = React.useState(false);
	const [accept, setAccept] = React.useState('1');
	const [loading, setLoading] = React.useState(false);
	return (
		<div className="flex flex-col w-full justify-between p-3 gap-2 border border-blue-300 bg-blue-50 rounded-md text-lg">
			<div className="flex flex-col xl:flex-row w-full justify-between p-3 gap-2 items-center text-lg">
				<p className="text-lg text-[#014361] mx-1 text-center lg:text-left">
					{props.view === 'report' &&
						'The report has been uploaded by the organizer.'}
					{props.view === 'cert' &&
						'Your certificate has been uploaded by the organiser.'}
				</p>
				<div className="flex flex-col lg:flex-row gap-3">
					<a href={props.reportLink} target="_blank">
						<Button
							variant="contained"
							style={{backgroundColor: '#1565c0'}}
							className="w-56">
							{props.view === 'report' && 'View Event Report'}
							{props.view === 'cert' && 'View Certificate'}
						</Button>
					</a>
					{props.view === 'report' && (
						<Button
							variant="outlined"
							className="w-56"
							onClick={() => {
								setOpen(true);
							}}>
							Open Action Panel
						</Button>
					)}
				</div>
			</div>
			<div className="">
				<Dialog
					open={open}
					onClose={() => {
						setOpen(false);
					}}>
					<DialogTitle>
						Do you want to approve or deny this
						<span className="text-[#007efd] ml-1">report</span>?
					</DialogTitle>
					<DialogContent>
						<AcceptDeny value={accept} setValue={setAccept}></AcceptDeny>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => {
								setOpen(false);
								setLoading(false);
							}}
							variant="outlined"
							color="error">
							Cancel
						</Button>
						<LoadingButton
							loadingIndicator="Submitting..."
							onClick={async (e) => {
								setLoading(true);
								//TODO Approve Report Here
							}}
							loading={loading}
							className="w-32"
							variant="contained"
							style={!loading ? {backgroundColor: '#1565c0'} : {}}>
							Submit
						</LoadingButton>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
};
export default ViewReport;
