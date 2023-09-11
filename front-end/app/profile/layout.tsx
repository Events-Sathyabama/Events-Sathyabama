import '../globals.css';
import Navbar from '../navbar';
import Footer from '../footer';

export const metadata = {
	title: 'User Profile | Events@Sathyabama',
	description: 'Profile page for an user in Events@Sathyabama.',
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
