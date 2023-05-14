export default function Description(props: {long_desc: string | undefined}) {
	return (
		<div className="w-full border border-gray-400 rounded-md">
			<p className="p-4">{props.long_desc}</p>
		</div>
	);
}
