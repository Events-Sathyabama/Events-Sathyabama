'use client';
import {TextField} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import React, {useState} from 'react';
import API from '../API';
import WebBackdrop from '../backdrop';
import CircularLoader from '../circularLoader';
import Popup from '../popup';
import {SyntheticEvent} from 'react';
import useEffect from '../useEffect';

interface LabelOption {
	name: string;
}
const axios = new API.Axios();
export default function Report() {
	const [subject, setSubject] = useState('');
	const [longDescription, setLongDescription] = useState('');
	const labels = [
		'low priority bug',
		'medium priority bug',
		'high priority bug',
		'requires immediate attention',
		'front-end issue',
		'back-end issue',
		'login issue',
		'otp or mail issue',
		'enhancement',
		'event application related issue',
		'feature suggestion',
	];

	const [selected, setSelected] = useState([]);
	const [subjectError, setSubjectError] = useState(false);
	const [longDescriptionError, setLongDescriptionError] = useState(false);

	const [initialLoader, setInitialLoader] = useState(false);

	useEffect(() => {
		// setInitialLoader(true);
	}, []);

	const [url, setUrl] = useState('');

	const handleAutocompleteChange = (event: any, newValue: any) => {
		setSelected(newValue);
	};

	const [loading, setLoading] = useState(false);
	const [showFailure, setShowFailure] = useState(false);

	const handleSubmit = async () => {
		try {
			if (!subject || !longDescription) {
				if (!subject) setSubjectError(true);
				if (!longDescription) setLongDescriptionError(true);
				return;
			}

			const data = {
				title: subject,
				body: longDescription,
				labels: selected,
			};

			setLoading(true);
			console.log(data);
			const response = await axios.post(API.get_url('user:report_bug'), data);
			console.log(response);

			setUrl(response.data.data.html_url);
			setLoading(false);
			setSubject('');
			setLongDescription('');
			setSelected([]);
			setSubjectError(false);
			setLongDescriptionError(false);
		} catch (error) {
			console.error('Error:', error);
			setShowFailure(true);
		}
		setLoading(false);
	};

	return (
		<>
			{initialLoader ? (
				<CircularLoader remainingHeight="85vh" remainingWidth="" />
			) : (
				<div className="flex flex-col w-full justify-center items-center">
					{showFailure && (
						<Popup.Error
							message="Something went wrong, try again!"
							showpopup={setShowFailure}
						/>
					)}
					{loading && (
						<WebBackdrop message="Posting your Bug Reports & Enhancement Suggestions!" />
					)}

					<div className="flex flex-col w-11/12 items-center my-5 gap-5 min-h-[80vh] justify-center">
						{url === '' ? (
							<>
								<h1 className="text-2xl text-center animateFadeIn">
									Report a Bug / Suggest Enhancement
								</h1>
								<p className="text-sm text-red-600 -mt-3">
									The asterisk (*) indicates a required field. These fields are
									mandatory to be filled out.
								</p>
								<TextField
									autoComplete="off"
									required
									id="outlined-required"
									label="Title of the issue / enhancement"
									fullWidth
									onChange={(e) => {
										setSubject(e.target.value);
										setSubjectError(false);
									}}
									inputProps={{
										maxLength: 240,
									}}
									helperText={
										subjectError ? (
											<p className="text-red-600">
												Issue / Enhancement Title is required!
											</p>
										) : (
											''
										)
									}
									value={subject}
								/>
								<TextField
									className="w-full"
									required
									label="Describe the issue / enhancement"
									name="longDescription"
									multiline
									minRows={10}
									inputProps={{
										maxLength: 5000,
									}}
									value={longDescription}
									onChange={(
										event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
									) => {
										setLongDescription(event.target.value);
										setLongDescriptionError(false);
									}}
									helperText={
										longDescriptionError ? (
											<p className="text-red-600">
												Issue / Enhancement Description is required!
											</p>
										) : (
											''
										)
									}
								/>
								<Autocomplete
									multiple
									options={labels}
									className="w-full"
									getOptionLabel={(option) => option}
									filterSelectedOptions
									value={selected}
									onChange={handleAutocompleteChange}
									renderInput={(params) => (
										<TextField
											{...params}
											label="Select the labels which are relevant to the issue / enhancement"
											placeholder="Select a label or start typing..."
										/>
									)}
								/>
								<Button
									type="submit"
									variant="contained"
									className="bg-blue-500 w-full"
									onClick={handleSubmit}>
									Report a Bug / Suggest Enhancement
								</Button>
							</>
						) : (
							<div className="flex flex-col justify-center p-8 items-center w-full min-h-[60vh] shadow-md rounded-xl border border-gray-300">
								<blockquote className="relative">
									<svg
										className="absolute left-2 transform -translate-x-6 -translate-y-8 h-16 w-16 text-blue-50"
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true">
										<path
											d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
											fill="currentColor"
										/>
									</svg>

									<div className="relative z-10">
										<p className="text-gray-800 -mt-1 text-xl text-center">
											Thanks for contributing to{' '}
											<span className="font-semibold">Events@Sathyabama</span>.{' '}
											<br /> You can track the status of your issue (or) enhancement
											at:
										</p>
									</div>
								</blockquote>
								<a
									href={url}
									className="text-2xl text-[#017efc] hover:underline text-center px-2 my-2"
									target="_blank">
									{url}
								</a>
							</div>
						)}
						<div className="flex flex-col items-center shadow-md w-full border border-gray-500 p-5 rounded-md bg-gray-50">
							<div className="text-black text-2xl mb-2 text-center">
								Do you want to contribute to this project?
							</div>
							<p className="text-gray-600 text-base text-center max-w-6xl">
								To make a contribution to this project, familiarity with any of the
								following technologies is a prerequisite: Next.js, React.js,
								TypeScript, Tailwind CSS, Material UI, Django, Django REST Framework,
								JWT or MySQL. Kindly click on this
								<a
									href="https://github.com/Events-Sathyabama/Events-Sathyabama"
									target="_blank"
									className="mx-1 cursor-pointer underline text-blue-600 hover:text-red-700 transition-all duration-750">
									link
								</a>
								to get started.
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
