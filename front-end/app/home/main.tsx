'use client';
import HomeCard from './card';
import {useEffect, useRef, useState} from 'react';
import API from '../API';
import CircularProgress from '@mui/material/CircularProgress';
import Page from './pagination';
const axios = new API.Axios();

export default function Main(props: {url: string; heading: string}) {
	let abc: {
		pk: string;
		title: string;
		club: string;
		image: string;
		short_description: string;
		date: string;
	}[] = [];
	const [data, setData] = useState(abc);
	const [isLoading, setIsLoading] = useState(true);
	const [pageNo, setPageNo] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [search, setSearch] = useState('');

	// BUG Optimize the use effect
	useEffect(() => {
		(async () => {
			console.log('searching for = ', search, ', page no = ', pageNo);
			setIsLoading(true); //FIXME why the loading screen not comming when next page is clicked?
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
		<div className="flex flex-col w-full h-full">
			<h1 className="text-2xl text-center underline mt-3">{props.heading}</h1>
			<input
				placeholder="Search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="border-2 p-2"
			/>
			{isLoading ? (
				<div className="flex flex-col justify-center items-center w-full min-h-[79vh]">
					<CircularProgress />
				</div>
			) : (
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
			)}
		</div>
	);
}
