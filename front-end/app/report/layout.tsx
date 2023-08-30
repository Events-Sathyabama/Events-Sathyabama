import Footer from '../footer';
import '../globals.css';
import Navbar from '../navbar';

export const metadata = {
	title: 'Report a Bug | Events@Sathyabama',
	description: 'Report a Bug / Suggest Enhancement.',
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
