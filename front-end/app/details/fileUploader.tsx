import React, {useState, useRef} from 'react';
import Popup from '../popup';
import API from '../API';
import LoadingButton from '@mui/lab/LoadingButton';

interface FileUploaderProps {
	eventId: string;
	mode: 'pdf' | 'zip' | 'image';
}

const axios = new API.Axios();

const FileUploader: React.FC<FileUploaderProps> = ({eventId, mode}) => {
	const [isDragOver, setIsDragOver] = useState(false);
	const [showSuccessPopup, setShowSuccessPopup] = useState(false);
	const [showErrorPopup, setShowErrorPopup] = useState(false);
	const [popupMessage, setPopupMessage] = useState('');
	const [dragText, setDragText] = useState(
		'Drag and drop (or) click here to upload file'
	);
	const [fileUploaded, setFileUploaded] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [uploadedFileName, setUploadedFileName] = useState('');
	const allowedFileTypes = {
		pdf: ['application/pdf'],
		zip: ['.zip'],
		image: ['image/jpeg', 'image/png'],
	};

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragOver(true);
		setDragText('Drop your file here...');
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragOver(false);
		setDragText('Drag and drop (or) click here to upload file');
	};

	const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragOver(false);

		const files = e.dataTransfer.files;

		if (files.length > 0) {
			const file = files[0];
			if (
				(mode === 'pdf' && file.size > 10 * 1024 * 1024) ||
				(mode === 'zip' && file.size > 100 * 1024 * 1024) ||
				(mode === 'image' && file.size > 10 * 1024 * 1024)
			) {
				setPopupMessage(
					`File size exceeds ${
						mode === 'pdf' ? '10MB' : mode === 'zip' ? '100MB' : '10MB'
					} limit.`
				);
				setShowErrorPopup(true);
			} else if (!allowedFileTypes[mode].includes(file.type)) {
				setPopupMessage(`Only ${mode.toUpperCase()} files are allowed!`);
				setShowErrorPopup(true);
			} else {
				await reportUpload(file);
			}
		}

		setDragText('Drag and drop (or) click here to upload file');
	};

	const reportUpload = async (file: File) => {
		try {
			setUploading(true);
			const formData = new FormData();
			// TODO axios call here bro
			formData.append('file', file);

			const response = await axios.post(
				API.get_url('event:upload_report', eventId),
				formData,
				{
					'Content-Type': 'multipart/form-data',
				}
			);
			console.log(response);

			setFileUploaded(true);
			setUploadedFileName(file.name);
			setPopupMessage('File Uploaded Successfully!');
			setShowSuccessPopup(true);
			setUploading(false);
			// console.log('File uploaded successfully:', response.data);
		} catch (error) {
			setPopupMessage('Error Uploading File!!');
			setShowErrorPopup(true);
			setUploading(false);
			console.error(error);
		}
	};

	const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		console.log(file?.type);

		if (file) {
			if (
				file.size >
				(mode === 'pdf' ? 10 : mode === 'zip' ? 100 : 10) * 1024 * 1024
			) {
				setPopupMessage(
					`File size exceeds ${
						mode === 'pdf' ? '10MB' : mode === 'zip' ? '100MB' : '10MB'
					} limit.`
				);
				setShowErrorPopup(true);
			} else if (!allowedFileTypes[mode].includes(file.type)) {
				setPopupMessage(`Only ${mode.toUpperCase()} files are allowed!`);
				setShowErrorPopup(true);
			} else {
				await reportUpload(file);
			}
		}
	};

	const deleteUploadedFile = () => {
		setFileUploaded(false);
		setUploadedFileName('');
		setFileUploaded(true);
	};

	const openFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<div
			className={`flex flex-col hover:bg-gray-100 transition-all duration-500 justify-center cursor-pointer items-center w-full mx-3 h-64 border border-1 border-gray-400 rounded-md ${
				isDragOver ? 'border-[#1976d2] bg-blue-50' : ''
			} ${uploading ? 'bg-gradient-to-t from-blue-50 to-white animate-pulse' : ''}`}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			onClick={openFileInput}>
			{fileUploaded ? (
				<div className="flex flex-col items-center w-full gap-3 p-4">
					<p className="text-xl text-center w-80 truncate">
						{uploadedFileName}.{mode}
					</p>
					<LoadingButton
						size="large"
						color="error"
						onClick={() => {
							deleteUploadedFile();
						}}
						loading={deleting}
						loadingIndicator="Deleting..."
						variant="outlined">
						<span>Delete File</span>
					</LoadingButton>
				</div>
			) : (
				<React.Fragment>
					<input
						type="file"
						accept={mode === 'pdf' ? '.pdf' : mode === 'zip' ? '.zip' : 'image/*'}
						className="hidden"
						ref={fileInputRef}
						onChange={handleFileInputChange}
						disabled={uploading}
					/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className={`w-10 h-10 transition-all duration-700 text-[#1976d2] ${
							isDragOver ? 'scale-150 ' : ''
						} ${uploading ? 'animate-ping mb-2' : ''}`}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
						/>
					</svg>
					{uploading ? (
						<p className="p-4 text-2xl text-center">
							Just a moment, uploading your file...
						</p>
					) : (
						<p className="p-4 text-2xl text-center">{dragText}</p>
					)}
				</React.Fragment>
			)}
			{showSuccessPopup && (
				<Popup.Success message={popupMessage} showpopup={setShowSuccessPopup} />
			)}
			{showErrorPopup && (
				<Popup.Error message={popupMessage} showpopup={setShowErrorPopup} />
			)}
		</div>
	);
};

export default FileUploader;
