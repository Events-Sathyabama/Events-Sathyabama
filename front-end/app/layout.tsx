import './globals.css';
import ScrollToTop from './scrollToTop';

export const metadata = {
	title: 'Events@Sathyabama',
	description:
		'Welcome to Events@Sathyabama. The one-stop Event Management System for all events at Sathyabama University',
};
export default function RootLayout({children}: {children: React.ReactNode}) {
	debugger
	return (
		<html lang="en">
			<body>
				{/* <WebBackdrop message={'Verifying Login Status...'} id="global-backdrop" /> */}
				<ScrollToTop />
				<script src="/login.js" />
				<div className="flex flex-col">{children}</div>
			</body>
		</html>
	);
}
