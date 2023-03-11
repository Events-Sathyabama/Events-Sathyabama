'use client';
import Header from './header';
import Poster from './poster';
import Tabs from './tabs';
import Venues from './venue';
import Popup from '../popup';
import {useState} from 'react';

export default function details() {
	const [Spopup, setSpopup] = useState(false);
	const [Fpopup, setFpopup] = useState(false);

	function showSuccessPopup() {
		setSpopup(true);
	}

	function showFailurePopup() {
		setFpopup(true);
	}

	return (
		<div className="flex flex-col w-full h-auto items-center justify-center">
			<div className="flex flex-col w-full items-end">
				{Spopup ? (
					<Popup.Success
						showpopup={setSpopup}
						message="Applications successfully updated!"></Popup.Success>
				) : null}
				{Fpopup ? (
					<Popup.Error
						showpopup={setFpopup}
						message="Applications not updated!"></Popup.Error>
				) : null}
			</div>
			<div className="flex flex-col w-11/12 h-auto">
				<Header></Header>
				<div className="flex flex-col sm:flex-row w-full h-auto mt-2 items-center gap-3 sm:items-start justify-center">
					<Poster></Poster>
					<div className="flex flex-col w-full justify-center items-center">
						<Venues></Venues>
						<Tabs
							showSuccessPopup={showSuccessPopup}
							showFailurePopup={showFailurePopup}></Tabs>
					</div>
				</div>
			</div>
		</div>
	);
}
