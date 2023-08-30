'use client';
import Footer from '../footer';
import '../globals.css';
import Navbar from '../navbar';

export default function HomeLayout({children}: {children: React.ReactNode}) {
	return (
		<section>
			<Navbar />
			{children}
			<Footer />
		</section>
	);
}
