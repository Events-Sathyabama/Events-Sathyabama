import React, {useState} from 'react';

const FileUploader = (props: {uploadFile: Function; info: string}) => {
	const [isDragOver, setIsDragOver] = useState(false);

	const handleDragEnter = (e: any) => {
		e.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = (e: any) => {
		e.preventDefault();
		setIsDragOver(false);
	};

	const handleDrop = (e: any) => {
		e.preventDefault();
		setIsDragOver(false);
		const files: File[] = Array.from(e.dataTransfer.files);
		props.uploadFile(files);
	};

	// const handleFiles = (files:File[]) => {
	// 	files.forEach((file) => {
	// 		const fileType = file.type;
	// 		if (fileType === 'application/pdf') {
	// 			// File is a PDF, process it further (e.g., upload to the server)
	// 			console.log('Uploading PDF file:', file);
	// 		} else {
	// 			console.warn('Invalid file type. Only PDF files are allowed.');
	// 		}
	// 	});
	// };

	const handleFileInput = (e: any) => {
		const files: File[] = Array.from(e.target.files);
		props.uploadFile(files);
		// Clear the file input value to allow selecting the same file again
		e.target.value = '';
	};

	return (
		<div>
			<div
				className={`w-24 h-24 border border-1 border-dotted ${
					isDragOver ? 'border-blue-700' : ''
				}`}
				onDragEnter={handleDragEnter}
				onDragOver={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}>
				Drag {props.info}
			</div>
			<div className="hidden">
				<input type="file" accept=".pdf" onChange={handleFileInput} />
			</div>
		</div>
	);
};

export default FileUploader;
