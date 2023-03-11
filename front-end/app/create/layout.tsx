import '../globals.css';
import Navbar from '../navbar';
import Footer from '../footer';

export default function CreateLayout({children}: {children: React.ReactNode}) {
	return (
		<section>
			<Navbar></Navbar>
			{children}
			<Footer></Footer>
		</section>
	);
}
