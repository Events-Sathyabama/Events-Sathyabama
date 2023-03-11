'use client';
import HomeCard from '../card';
import {useEffect, useState} from 'react';
import API from '../../API';

const axios = new API.Axios();

const dummyData = [
	{
		title: 'Madhugai - The Strength',
		subheader: 'SDC - Community Development Club',
		imageUrl: '/eventPosters/Madhugai.jpg',
		description:
			"Outreach Program on the eve of Women's day at Sathyabama Adopted Schools. Health and Hygiene Kit Distribution to Girl Students.",
		date: "31 Mar '23 - 31 Mar '23",
		learnMoreLink: '/details',
	},
	{
		title: 'Winovate',
		subheader: 'Microsoft Club and AICTE Innovation Club',
		imageUrl: '/eventPosters/Winovate.jpg',
		description: 'Windows Customisation Battle',
		date: "9 Mar '23",
		learnMoreLink: 'https://google.com',
	},
	{
		title: 'Madhugai - The Strength',
		subheader: 'SDC - Community Development Club',
		imageUrl: '/eventPosters/Madhugai.jpg',
		description:
			"Outreach Program on the eve of Women's day at Sathyabama Adopted Schools. Health and Hygiene Kit Distribution to Girl Students.",
		date: "7 Mar '23 - 8 Mar '23",
		learnMoreLink: 'https://google.com',
	},
	{
		title: 'Winovate',
		subheader: 'Microsoft Club and AICTE Innovation Club',
		imageUrl: '/eventPosters/Winovate.jpg',
		description: 'Windows Customisation Battle',
		date: "9 Mar '23",
		learnMoreLink: 'https://google.com',
	},
	{
		title: 'Madhugai - The Strength',
		subheader: 'SDC - Community Development Club',
		imageUrl: '/eventPosters/Madhugai.jpg',
		description:
			"Outreach Program on the eve of Women's day at Sathyabama Adopted Schools. Health and Hygiene Kit Distribution to Girl Students.",
		date: "7 Mar '23 - 8 Mar '23",
		learnMoreLink: 'https://google.com',
	},
	{
		title: 'Winovate',
		subheader: 'Microsoft Club and AICTE Innovation Club',
		imageUrl: '/eventPosters/Winovate.jpg',
		description: 'Windows Customisation Battle',
		date: "9 Mar '23",
		learnMoreLink: 'https://google.com',
	},
	{
		title: 'Madhugai - The Strength',
		subheader: 'SDC - Community Development Club',
		imageUrl: '/eventPosters/Madhugai.jpg',
		description:
			"Outreach Program on the eve of Women's day at Sathyabama Adopted Schools. Health and Hygiene Kit Distribution to Girl Students.",
		date: "7 Mar '23 - 8 Mar '23",
		learnMoreLink: 'https://google.com',
	},
];

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
			const request = await axios.get(API.get_url('event:completed_list'));
			if (request.status === 200) {
				setData(request.data);
				console.log(request.data);
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
