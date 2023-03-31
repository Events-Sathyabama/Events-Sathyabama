export default function Header(props: {
	title: string | undefined;
	club: string | undefined;
	short_desc: string | undefined;
}) {
	return (
		<div className="flex flex-col bg-[#f3f6f9] p-3 rounded-lg mt-4">
			<h1 className="text-black">
				<span className="text-3xl font-roboto text-[#007efd]">{props.title}</span>{' '}
				<p className="text-xl">{props.club}</p>
			</h1>
			<p className="text-lg font-normal text-gray-500 lg:text-xl">
				{props.short_desc}
			</p>
		</div>
	);
}
