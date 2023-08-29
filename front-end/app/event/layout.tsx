import '../globals.css';
import Navbar from '../navbar';
import Footer from '../footer';

export const metadata = {
	title: 'Create / Update Event | Events@Sathyabama',
	description: 'Edit an event or create a new one here.',
};

export default function CreateLayout({children}: {children: React.ReactNode}) {
	return (
		<section>
			<Navbar />
			{children}
			<Footer />
		</section>
	);
}
