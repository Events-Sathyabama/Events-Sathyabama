'use client';
import HomeCard from './card';
import {useState} from 'react';
import API from '../API';
import CircularProgress from '@mui/material/CircularProgress';
import Page from './pagination';
import TextField from '@mui/material/TextField';
const axios = new API.Axios();
import InputAdornment from '@mui/material/InputAdornment';
import Image from 'next/image';
import useEffect from '../useEffect';
import ApiLoader from '../apiLoader';
import handleError from '../handleError';

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

	useEffect(
		() => {
			let query: number;
			const queryPromise = new Promise((resolve, reject) => {
				query = window.setTimeout(async () => {
					try {
						const response = await axios.get(API.get_url(props.url), {
							page: pageNo,
							q: search,
						});
						console.log('query: ', search, response);
						if (response.status === 200) {
							if (!response.data.hasOwnProperty('results')) {
								setPageNo(1);
								return;
							}
							setTotalPage(response.data.total_pages);
							setData(response.data.results);
							if (response.data.count === 0) {
								setLoader(404);
							} else {
								setLoader(200);
							}
						} else {
							setLoader(response.status);
						}
						resolve(response);
					} catch (err) {
						setPageNo(1);
						reject(err);
					}
				}, 500);
			});
			return [
				queryPromise,
				() => {
					console.log('cleanup: ', query);
					window.clearInterval(query);
				},
			];
		},
		[pageNo, search],
		setLoader
	);

	return (
		<div className="flex flex-col w-full h-full items-center gap-3">
			<h1 className="text-2xl text-center underline mt-3 z-30">{props.heading}</h1>
			<div className="p-3 w-11/12 md:w-1/2 rounded-xl">
				<TextField
					autoComplete="off"
					onChange={(e) => {
						setSearch(e.target.value);
					}}
					label="Search for events by name, club, branch, or description."
					value={search}
					placeholder="Start typing..."
					size="medium"
					className="w-full z-30" // made z-index greater than 20 to show above loading screen
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
			{<ApiLoader state={Loader} message={'Event Not Found'} />}
			<div className="flex justify-center flex-col items-center gap-4">
				<div className="flex flex-row flex-wrap m-3 justify-center gap-3">
					{data.map((card) => (
						<HomeCard
							key={card.pk}
							title={card.title}
							subheader={card.club}
							imageUrl={card.image}
							description={card.short_description}
							date={card.date}
							learnMoreLink={'/details/' + card.pk}
						/>
					))}
				</div>
				<Page totalPage={totalPage} pageNo={pageNo} setPageNo={setPageNo} />
			</div>
		</div>
	);
}
