export default function Poster(props: {image: string | File | undefined}) {
	return (
		<img
			className="max-h-[60vh] w-full sm:max-w-xs object-fill rounded-md shadow-md"
			src={typeof props.image === 'string' ? props.image : ''}
			alt="image description"
		/>
	);
}
