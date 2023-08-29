'use client';
import {useState, useEffect} from 'react';

function LoadingCard() {
	return (
		<div className="flex flex-col border border-gray-400 rounded-md bg-white transition-all duration-300 w-80 justify-center items-center animateFadeIn p-2">
			<div className="w-72 truncate h-8 animate-pulse bg-gray-300 rounded-xl mb-2 mt-2" />
			<div className="w-72 truncate h-4 animate-pulse bg-gray-200 rounded-xl mb-4" />
			<div className="flex items-center h-96 w-11/12 border border-gray-300 p-2 animate-pulse">
				{' '}
				<svg
					className="text-gray-300"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 640 512">
					<path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
				</svg>
			</div>
			<div className="w-72 truncate h-6 animate-pulse bg-gray-200 rounded-xl mb-2 mt-4" />
		</div>
	);
}

export default function Loading() {
	useEffect(() => {
		const width = window.innerWidth;
		if (width >= 1200) {
			setNumCards(4);
		} else if (width >= 600) {
			setNumCards(2);
		} else {
			setNumCards(1);
		}
	}, []);

	const [numCards, setNumCards] = useState(1);
	const cards = Array(numCards).fill(0);
	return (
		<div className="flex flex-col w-full h-full items-center gap-3">
			<div className="mt-3 w-48 rounded-xl animateFadeIn">
				<div className="h-12 animate-pulse bg-gray-300 rounded-xl w-full" />
			</div>
			<div className="p-3 pt-0 w-11/12 md:w-1/2 rounded-xl animateFadeIn">
				<div className="h-12 animate-pulse bg-gray-300 rounded-xl w-full" />
			</div>
			<div className="flex flex-col justify-center items-center w-full min-h-[65vh]">
				<div className="flex flex-wrap justify-center items-center gap-3">
					{cards.map((_, index) => (
						<LoadingCard key={index} />
					))}
				</div>
			</div>
		</div>
	);
}
