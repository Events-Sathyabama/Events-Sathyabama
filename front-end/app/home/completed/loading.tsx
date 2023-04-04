"use client"
import CircularProgress from '@mui/material/CircularProgress';
export default function Loading() {
	return (
		<div className="flex flex-col items-center w-full justify-center h-[85vh]">
			<CircularProgress></CircularProgress>
		</div>
	);
}