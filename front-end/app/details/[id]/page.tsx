'use client';
import Header from '../header';
import Poster from '../poster';
import Tabs from '../tabs';
import Venues from '../venue';
import {useEffect, useState} from 'react';
import API from '../../API';

const axios = new API.Axios();

export default function details(props: {params: {id: number}}) {
	let abc: {
		title: string | null;
		pk: string | null;
		club: string | null;
		date: string | null;
		time: string | null;
		venue: string | null;
		long_description: string | null;
		short_description: string | null;
		organizer: {name: string; role: string}[];
		image: string | null;
	} = {
		title: null,
		pk: null,
		club: null,
		date: null,
		time: null,
		venue: null,
		long_description: null,
		short_description: null,
		organizer: [],
		image: null,
	};
	const [data, setData] = useState(abc);
	useEffect(() => {
		(async () => {
			const request = await axios.get(
				API.get_url('event:detail', [props.params.id])
			);
			if (request.status == 200) {
				console.log(request.data);
				setData(request.data);
			}
		})();
	}, []);
	return (
		<div className="flex flex-col w-full h-auto items-center justify-center">
			<div className="flex flex-col w-11/12 h-auto">
				<Header
					club={data.club}
					short_desc={data.short_description}
					title={data.title}
				/>
				<div className="flex flex-col sm:flex-row w-full h-auto mt-2 items-center gap-3 sm:items-start justify-center">
					<Poster image={data.image} />
					<div className="flex flex-col w-full justify-center items-center">
						<Venues venue={data.venue} dates={data.date} time={data.time} />
						<Tabs long_desc={data.long_description} coordinator={data.organizer} />
					</div>
				</div>
			</div>
		</div>
	);
}
