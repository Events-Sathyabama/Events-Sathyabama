'use client';
import HomeCard from '../card';
import {useEffect, useState} from 'react';
import API from '../../API';

const axios = new API.Axios();

export default function Upcoming() {
	let abc: {
		pk: string;
		title: string;
		club: string;
		image: string;
		short_description: string;
		date: string;
	}[] = [];
	const [data, setData] = useState(abc);

	useEffect(() => {
		(async () => {
			const request = await axios.get(API.get_url('event:upcoming_list'));
			if (request.status === 200) {
				setData(request.data);
			}
		})();
	}, []);
	return (
		<div className="flex flex-col w-full h-full">
			<h1 className="text-2xl text-center underline mt-3">Upcoming Events</h1>
			<div className="flex flex-row flex-wrap m-3 justify-center gap-3">
				{data
					? data.map((card) => (
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
					: ''}
			</div>
		</div>
	);
}
