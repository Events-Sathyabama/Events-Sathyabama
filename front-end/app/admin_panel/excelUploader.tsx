import React, {useState, useRef} from 'react';
import API from '../API';
import Popup from '../popup';
import * as XLSX from 'xlsx';

interface ExcelUploaderProps {
	eventId: string;
	path?: string;
}

const axios = new API.Axios();

const ExcelUploader: React.FC<ExcelUploaderProps> = (props: ExcelUploaderProps) => {
	const eventId = props.eventId;
	const [showSuccessPopup, setShowSuccessPopup] = useState(false);
	const [showErrorPopup, setShowErrorPopup] = useState(false);
	const [popupMessage, setPopupMessage] = useState('');
	const [uploading, setUploading] = useState(false);
	const [isDragOver, setIsDragOver] = useState(false);
	const allowedFileTypes = {
		excel: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
	};

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			if (
				file.type !==
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			) {
				setPopupMessage('Only Excel files are allowed!');
				setShowErrorPopup(true);
			} else {
				await reportUpload(file);
			}
		}
	};

	const reportUpload = async (file: File) => {
		try {
			setUploading(true);

			const reader = new FileReader();
			reader.onload = (e) => {
				const data = new Uint8Array(e.target?.result as ArrayBuffer);
				const workbook = XLSX.read(data, {type: 'array'});
				const sheetName = workbook.SheetNames[0];
				const sheet = workbook.Sheets[sheetName];

				const parsedData = XLSX.utils.sheet_to_json(sheet, {header: 1});

				const requiredColumns = [
					'registernumber',
					'firstname',
					'lastname',
					'email',
					'role',
					'branch',
					'joiningyear',
					'leavingyear',
				];

				const columnHeaders: any = parsedData[0];
				const cleanedColumnHeaders = columnHeaders.map((col: any) =>
					col.toLowerCase().replace(/[-_]/g, '')
				);

				const missingColumns = requiredColumns.filter(
					(col) => !cleanedColumnHeaders.includes(col.replace(/[-_]/g, ''))
				);

				if (missingColumns.length > 0) {
					setPopupMessage(`Missing columns: ${missingColumns.join(', ')}`);
					setShowErrorPopup(true);
				} else {
					setPopupMessage('File Uploaded Successfully!');
					setShowSuccessPopup(true);
				}

				setUploading(false);
			};

			reader.readAsArrayBuffer(file);
		} catch (error) {
			setPopupMessage('Error Uploading File!!');
			setShowErrorPopup(true);
			setUploading(false);
			console.error(error);
		}
	};

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragOver(true);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragOver(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragOver(false);

		const files = e.dataTransfer.files;
		if (files.length > 0) {
			const file = files[0];
			if (
				file.type !==
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			) {
				setPopupMessage('Only Excel files are allowed!');
				setShowErrorPopup(true);
			} else {
				reportUpload(file);
			}
		}
	};

	const openFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<>
			<div
				className={`flex flex-col hover:bg-gray-100 transition-all duration-500 justify-center cursor-pointer items-center w-full mx-3 h-64 border border-1 border-gray-400 rounded-md ${
					isDragOver ? 'border-[#1976d2] bg-blue-50' : ''
				}`}
				onDragEnter={handleDragEnter}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={openFileInput}>
				<input
					type="file"
					accept=".xlsx, .xls"
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
						uploading ? 'animate-ping mb-2' : ''
					}`}>
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
					<p className="p-4 text-2xl text-center">
						{isDragOver
							? 'Drop the Excel file here'
							: "Drag and drop (or) click here to upload New Users' Excel file"}
					</p>
				)}
			</div>
			{showSuccessPopup && (
				<Popup.Success message={popupMessage} showpopup={setShowSuccessPopup} />
			)}
			{showErrorPopup && (
				<Popup.Error message={popupMessage} showpopup={setShowErrorPopup} />
			)}
		</>
	);
};

export default ExcelUploader;
