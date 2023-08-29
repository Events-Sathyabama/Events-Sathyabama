import Link from 'next/link';

export default function LandingNav(): JSX.Element {
	return (
		<div className="flex flex-row w-full h-20 justify-center items-center">
			<Link href="/" className="flex flex-row items-center gap-3">
				<img src="/logo.svg" className="h-12 w-12" />
				<h1 className="text-3xl font-roboto text-black font-semibold">
					Events@Sathyabama
				</h1>
			</Link>
		</div>
	);
}
