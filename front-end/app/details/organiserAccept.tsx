import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import OrganiserDialog from './organiserDialog';

export default function Acceptance(props: {title: any; id: number}) {
	const [approved, setApproved] = React.useState(false);
	return (
		<>
			{approved === false && (
				<Alert severity="info" className="w-full">
					<AlertTitle className="font-bold text-lg mb-0">
						Event Approval Required
					</AlertTitle>
					Please review the event details and <strong>approve or deny </strong>the
					event.
					<OrganiserDialog
						title={props.title}
						id={props.id}
						setApproved={setApproved}></OrganiserDialog>
				</Alert>
			)}
		</>
	);
}
