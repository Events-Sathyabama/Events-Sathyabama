'use client';
import HomeCard from '../card';
import {useEffect, useState} from 'react';
import API from '../../API';
import CircularProgress from '@mui/material/CircularProgress';
import api_calls from '../api_calls';
import Page from '../pagination';

const axios = new API.Axios();
const dummyData = [
	// ...dummy data
];

export default function Ongoing() {
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
			setIsLoading(true);
			await api_calls(
				pageNo,
				setPageNo,
				totalPage,
				setTotalPage,
				setData,
				'event:ongoing_list'
			);
			setIsLoading(false);
		})();
	}, []);

	return (
		<div className="flex flex-col w-full h-full">
			<h1 className="text-2xl text-center underline mt-3">Ongoing Events</h1>

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
