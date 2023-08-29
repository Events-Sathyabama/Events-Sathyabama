import '../globals.css';
import Navbar from '../navbar';
import Footer from '../footer';

export const metadata = {
	title: 'EMS Admin Panel | Events@Sathyabama',
	description: 'Admin Panel for the entire event management system.',
};

export default function HomeLayout({children}: {children: React.ReactNode}) {
	return (
		<section>
			<Navbar />
			{children}
			<Footer />
		</section>
	);
}
