export default function Poster(props: {image: string | null}) {
	return (
		<img
			className="max-h-[60vh] w-full sm:max-w-xs object-fill rounded-md shadow-md"
			src={props.image || ''}
			alt="image description"
		/>
	);
}
