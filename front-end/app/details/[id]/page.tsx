'use client';
import Header from '../header';
import Poster from '../poster';
import Tabs from '../tabs';
import {useEffect, useState} from 'react';
import API from '../../API';
import Popup from '../../popup';
import EventTime from '../venue';
import Fab from '@mui/material/Fab';

const axios = new API.Axios();

export default function details(props: {params: {id: number}}) {
	const [Spopup, setSpopup] = useState(false);
	const [Fpopup, setFpopup] = useState(false);

	function showSuccessPopup() {
		setSpopup(true);
	}

	function showFailurePopup() {
		setFpopup(true);
	}

	const [data, setData] = useState({
		title: null,
		pk: null,
		club: null,
		date: null,
		time: null,
		venue: null,
		long_description: null,
		short_description: null,
		organizer: [],
		image: null,
	});

	useEffect(() => {
		(async () => {
			const request = await axios.get(
				API.get_url('event:detail', [props.params.id])
			);
			if (request.status == 200) {
				setData(request.data);
			}
		})();
	}, []);
	return (
		<div className="flex flex-col w-full h-auto items-center justify-center">
			<div className="flex flex-col w-full items-end">
				{Spopup ? (
					<Popup.Success
						showpopup={setSpopup}
						message="Applications updated!"></Popup.Success>
				) : null}
				{Fpopup ? (
					<Popup.Error
						showpopup={setFpopup}
						message="Applications not updated!"></Popup.Error>
				) : null}
			</div>
			<div className="flex flex-col w-11/12 h-auto">
				<Header
					club={data.club}
					short_desc={data.short_description}
					title={data.title}
				/>
				<div className="flex flex-col sm:flex-row w-full h-auto mt-2 items-center gap-3 sm:items-start justify-center">
					<Poster image={data.image} />
					<div className="flex flex-col w-full justify-center items-center mt-2">
						<EventTime
							dates={data.date}
							venue={data.venue}
							time={data.time}></EventTime>
						<Tabs
							long_desc={data.long_description}
							coordinator={data.organizer}
							showSuccessPopup={showSuccessPopup}
							showFailurePopup={showFailurePopup}
						/>
					</div>
					<Fab
						color="primary"
						aria-label="edit"
						sx={{
							position: 'fixed',
							right: '1.5rem',
							bottom: '1.5rem',
							height: '4rem',
							width: '4rem',
						}}
						style={{backgroundColor: '#1565c0'}}>
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
								d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
							/>
						</svg>
					</Fab>
				</div>
			</div>
		</div>
	);
}
