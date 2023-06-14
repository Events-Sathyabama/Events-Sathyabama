import '../globals.css';
import Navbar from '../navbar';
import Footer from '../footer';

export const metadata = {
	title : "Event Details | Events@Sathyabama",
	description : "Description about a particular event."
}

export default function HomeLayout({children}: {children: React.ReactNode}) {
	return (
		<section>
			<Navbar></Navbar>
			{children}
			<Footer></Footer>
		</section>
	);
}
