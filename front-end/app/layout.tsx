import WebBackdrop from './backdrop';
import {useState} from 'react';
import API from './API';
import {useRouter} from 'next/navigation';
import './globals.css';

export const metadata = {
	title: 'Events@Sathyabama',
	description:
		'Welcome to Events@Sathyabama. The one-stop Event Management System for all events at Sathyabama University',
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
