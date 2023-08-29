'use client';
import '../globals.css';
import Navbar from '../navbar';
import Footer from '../footer';

export default function HomeLayout({children}: {children: React.ReactNode}) {
	return (
		<section>
			<Navbar />
			{children}
			<Footer />
		</section>
	);
}
