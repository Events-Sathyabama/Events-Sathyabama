import Footer from '../footer';
import '../globals.css';
import Navbar from '../navbar';

export const metadata = {
	title: 'Event Details | Events@Sathyabama',
	description: 'Description about a particular event.',
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
