'use client';
import HomeCard from './card';
import {useEffect, useState} from 'react';
import API from '../API';
import CircularProgress from '@mui/material/CircularProgress';
import Page from './pagination';
import TextField from '@mui/material/TextField';
const axios = new API.Axios();
import InputAdornment from '@mui/material/InputAdornment';

export default function Main(props: {url: string; heading: string}) {
	let abc: {
		pk: string;
		title: string;
		club: string;
		image: string;
		short_description: string;
		date: string;
	}[] = [];
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
	const [isLoading, setIsLoading] = useState(true);
	const [pageNo, setPageNo] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [search, setSearch] = useState('');

	// BUG Optimize the use effect
	useEffect(() => {
		setIsLoading(true); //FIXME why the loading screen not comming when next page is clicked?
		(async () => {
			if (pageNo > totalPage) {
				return;
			}
			(async () => {
				try {
					const request = await axios.get(API.get_url(props.url), {
						page: pageNo,
						q: search,
					});
					if (request.status === 200) {
						if (!request.data.hasOwnProperty('results')) {
							setPageNo(1);
							return;
						}
						setTotalPage(request.data.total_pages);
						setData(request.data.results);
					}
				} catch (err: any) {
					if (err.response.status === 404) {
						setPageNo(1);
					}
				}
			})();
			setIsLoading(false);
		})();
	}, [pageNo, search]);

	return (
		<div className="flex flex-col w-full h-full items-center gap-3">
			<h1 className="text-2xl text-center underline mt-3">{props.heading}</h1>
			<div className="p-3 w-11/12 md:w-1/2 rounded-xl">
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
			{data.length != 0 && (isLoading || data[0].pk === '') ? (
				<div className="flex flex-col justify-center items-center w-full min-h-[65vh]">
					<CircularProgress />
				</div>
			) : (
				<div className="flex justify-center flex-col items-center gap-4">
					<div className="flex flex-row flex-wrap m-3 justify-center gap-3">
						{data.length !== 0 && data[0].pk != ''  ? (
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
							<div className="flex flex-col justify-center items-center w-96 -mt-14 mb-14 h-[58vh]">
								<img src="/eventsNotFound.svg" className="opacity-80"></img>
								<p className="text-2xl font-extralight text-blue-500 opacity-80 -mt-16">
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
