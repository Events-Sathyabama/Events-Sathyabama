import React, {useState} from 'react';

function ImageLoader(props: any) {
	const [imgStatus, setImgStatus] = useState(false);
	return (
		<div className={props.className}>
			{imgStatus ? (
				<></>
			) : props.children ? (
				props.children
			) : (
				<div className="w-full h-full flex justify-center items-center flex-col gap-4">
					<span className="text-skin-secondary">
						{props.loading_text ? props.loading_text : 'Loading...'}
					</span>
				</div>
			)}
			<img
				src={props.src}
				className={imgStatus ? 'w-full h-full' : 'w-full h-full hidden'}
				alt={props.alt}
				onLoad={() => setImgStatus(true)}
			/>
		</div>
	);
}

export default ImageLoader;
