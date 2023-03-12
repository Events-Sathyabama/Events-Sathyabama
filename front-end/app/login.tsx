'use client';

import {useEffect} from 'react';
import API from './API';
import {useRouter} from 'next/navigation';

export default function Login(props: {url?: string}) {


	const router = useRouter();
	useEffect(() => {
		if (!API.is_logged_in()) {
			router.push(props.url || '/');
		}
	}, []);
	return <div className={'userlogged in'}></div>;
}