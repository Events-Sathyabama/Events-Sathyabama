import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function OrganiserDialog(props: {title: any}) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

    // TODO for comments you can use react query to get the value of textfield else use useRef for textfield

	return (
		<div className="mt-2">
			<Button
				variant="contained"
				onClick={handleClickOpen}
				style={{backgroundColor: '#1565c0'}}>
				Open Action Panel
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>
					Do you want to approve or deny
					<span className="text-[#007efd] ml-1">{props.title}</span>?
				</DialogTitle>
				<DialogContent>
					<AcceptDeny></AcceptDeny>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Comments (optional)"
						placeholder="Start typing..."
						fullWidth
						multiline
						maxRows={6}
						variant="filled"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant="outlined" color="error">
						Cancel
					</Button>
					<Button
						onClick={handleClose}
						variant="contained"
						style={{backgroundColor: '#1565c0'}}>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

function AcceptDeny() {
	const [value, setValue] = React.useState('Accepted');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
        console.log((event.target as HTMLInputElement).value);
        //TODO use this bro accept or deny
	};

	return (
		<FormControl>
			<RadioGroup value={value} onChange={handleChange}>
				<FormControlLabel
					value="Accepted"
					style={{fontSize: '100px'}}
					control={<Radio />}
					label={<p className="text-xl text-green-600">Approve</p>}
				/>
				<FormControlLabel
					value="Denied"
					control={<Radio />}
					label={<p className="text-xl text-red-600">Deny</p>}
				/>
			</RadioGroup>
		</FormControl>
	);
}
