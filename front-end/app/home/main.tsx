'use client';
import HomeCard from './card';
import {useState} from 'react';
import API from '../API';
import Page from './pagination';
import TextField from '@mui/material/TextField';
const axios = new API.Axios();
import InputAdornment from '@mui/material/InputAdornment';
import Image from 'next/image';
import useEffect from '../useEffect';
import ApiLoader from '../apiLoader';
import handleError from '../handleError';

function LoadingCard() {
	return (
		<div className="flex flex-col border border-gray-400 rounded-md bg-white transition-all duration-300 w-80 justify-center items-center p-2">
			<div className="w-72 truncate h-8 animate-pulse bg-gray-300 rounded-xl mb-2 mt-2"></div>
			<div className="w-72 truncate h-4 animate-pulse bg-gray-200 rounded-xl mb-4"></div>
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
			<div className="w-72 truncate h-6 animate-pulse bg-gray-200 rounded-xl mb-2 mt-4"></div>
		</div>
	);
}

export default function Main(props: {url: string; heading: string}) {
	const [data, setData] = useState([
		{
			pk: '',
			title: '',
			club: '',
			image: '',
			short_description: '',
			date: '',
		},
	]);
	const [pageNo, setPageNo] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [search, setSearch] = useState('');
	const [Loader, setLoader] = useState(0);

	const [showSearch, setShowSearch] = useState(false);

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

	const [numCards, setNumCards] = useState(4);
	const cards = Array(numCards).fill(0);

	useEffect(
		() => {
			const query = window.setTimeout(async () => {
				try {
					const response = await axios.get(API.get_url(props.url), {
						page: pageNo,
						q: search,
					});
					if (response.status === 200) {
						if (!response.data.hasOwnProperty('results')) {
							setPageNo(1);
							return;
						}
						setTotalPage(response.data.total_pages);
						setData(response.data.results);
						setShowSearch(true);
						if (response.data.count === 0) {
							setLoader(404);
						} else {
							setLoader(200);
						}
					} else {
						setLoader(response.status);
					}
				} catch (err) {
					handleError(err, setLoader);
					setPageNo(1);
				}
			}, 500);

			return () => {
				window.clearInterval(query);
			};
		},
		[pageNo, search],
		setLoader
	);

	return (
		<div className="flex flex-col w-full h-full items-center gap-3">
			{showSearch ? (
				<>
					<h1 className="text-2xl text-center mt-3 animateFadeIn">
						{props.heading}
					</h1>
					<div className="p-3 w-11/12 md:w-1/2 -mt-2 rounded-xl animateFadeIn">
						<TextField
							autoComplete="off"
							onChange={(e) => setSearch(e.target.value)}
							label="Search for events by name, club, branch, or description."
							value={search}
							placeholder="Start typing..."
							size="medium"
							className="w-full"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
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
												d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
											/>
										</svg>
									</InputAdornment>
								),
							}}
							variant="standard"
						/>
					</div>
				</>
			) : (
				<>
					<div className="mt-3 w-48 rounded-xl">
						<div className="h-12 animate-pulse bg-gray-300 rounded-xl w-full"></div>
					</div>
					<div className="p-3 pt-0 w-11/12 md:w-1/2 rounded-xl">
						<div className="h-12 animate-pulse bg-gray-300 rounded-xl w-full"></div>
					</div>
				</>
			)}
			{data.length != 0 && (Loader !== 200 || data[0].pk === '') ? (
				<div className="flex flex-col justify-center items-center w-full min-h-[65vh]">
					<div className="flex flex-wrap justify-center items-center gap-3">
						{cards.map((_, index) => (
							<LoadingCard key={index} />
						))}
					</div>
				</div>
			) : (
				<div className="flex justify-center flex-col items-center gap-4">
					<div className="flex flex-row flex-wrap justify-center gap-3">
						{data.length !== 0 && data[0].pk != '' ? (
							data.map((card) => (
								<HomeCard
									key={card.pk}
									title={card.title}
									subheader={card.club}
									imageUrl={card.image}
									description={card.short_description}
									date={card.date}
									learnMoreLink={'/details/' + card.pk}
								/>
							))
						) : (
							<div className="flex flex-col justify-center items-center w-full h-[61vh] animateFadeIn">
								<Image
									src="/eventsNotFound.svg"
									width={500}
									height={500}
									priority
									alt=""></Image>
								<p className="text-2xl font-light text-[#017efc] mt-4">
									No events found!!
								</p>
							</div>
						)}
					</div>
					<Page totalPage={totalPage} pageNo={pageNo} setPageNo={setPageNo} />
				</div>
			)}
		</div>
	);
}
