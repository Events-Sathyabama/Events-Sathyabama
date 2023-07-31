import '../globals.css';
import Navbar from '../navbar';
import Footer from '../footer';

export const metadata = {
	title: 'Report a Bug | Events@Sathyabama',
	description: 'Report a Bug / Suggest Enhancement.',
};

export default function HomeLayout({children}: {children: React.ReactNode}) {
	return (
		<section>
			<Navbar></Navbar>
			{children}
			<Footer></Footer>
		</section>
	);
}
