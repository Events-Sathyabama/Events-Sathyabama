export default function Description(props: {long_desc: string | undefined}) {
	return (
		<div className="w-full border border-gray-300 rounded-md">
			<pre className="p-4 font-roboto">{props.long_desc}</pre>
		</div>
	);
}
