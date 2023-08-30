'use client';
import {usePathname, useSearchParams} from 'next/navigation';
import {useEffect} from 'react';

export default function useNavigationEvent() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname, searchParams]);
	return null;
}
