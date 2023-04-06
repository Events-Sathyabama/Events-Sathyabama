import WebBackdrop from './backdrop';
import {useState} from 'react';
import API from './API';
import {useRouter} from 'next/navigation';
import './globals.css';

export const metadata = {
	title: 'Events@Sathyabama',
	description:
		'Event@Sathyabama is useful for planning, implementing, and carrying out effective events.',
};
export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en">
			<body>
				<WebBackdrop message={'Verifying Login Status...'} id="global-backdrop" />
				<script src="/login.js"></script>
				<div className="flex flex-col">{children}</div>
			</body>
		</html>
	);
}
