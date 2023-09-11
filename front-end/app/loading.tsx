'use client';
import CircularLoader from '@/app/circularLoader';

export default function Loading() {
	return (
		<div className="flex flex-col justify-center items-center w-full h-screen">
			<CircularLoader remainingHeight="92vh" remainingWidth="99vw" />
		</div>
	);
}
