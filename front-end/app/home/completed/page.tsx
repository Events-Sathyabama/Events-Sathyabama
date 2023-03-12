'use client';
import HomeCard from '../card';
import {useEffect, useRef, useState} from 'react';
import API from '../../API';
import CircularProgress from '@mui/material/CircularProgress';
import Page from '../pagination';
import api_calls from '../api_calls';
const axios = new API.Axios();

export default function Completed() {
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
	useEffect(() => {
		(async () => {
			setIsLoading(true); //FIXME why the loading screen not comming when next page is clicked?
			await api_calls(
				pageNo,
				setPageNo,
				totalPage,
				setTotalPage,
				setData,
				'event:completed_list'
			);
			setIsLoading(false);
		})();
	}, [pageNo]);
	return (
		<div className="flex flex-col w-full h-full">
			<h1 className="text-2xl text-center underline mt-3">Completed Events</h1>

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
