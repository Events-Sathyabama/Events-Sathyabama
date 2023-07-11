import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import ImageLoader from '../loader';

interface HomeCardProps {
	title: string;
	subheader: string;
	imageUrl: string;
	description: string;
	date: string;
	learnMoreLink: string;
	hover?: boolean;
}

export default function HomeCard(props: HomeCardProps) {
	const {title, subheader, imageUrl, description, date, learnMoreLink} = props;
	const [expanded, setExpanded] = React.useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	let hover = props.hover;
	if (hover === undefined) {
		hover = true;
	}
	return (
		<Link href={learnMoreLink}>
			<div
				className={
					(hover === true
						? 'sm:hover:shadow-lg hover:border-blue-500 border border-gray-400'
						: '') +
					'border border-gray-400 rounded-md bg-white transition-all duration-300 w-80 animateFadeIn'
				}>
				<CardHeader
					title={<div className="w-72 truncate">{title}</div>}
					subheader={<div className="w-72 truncate">{subheader}</div>}
				/>
				<div className="flex w-full justify-center items-center">
					{imageUrl === 'pulseLoading' ? (
						<div className="flex items-center h-96 w-11/12 border border-gray-300 p-2 animate-pulse">
							{' '}
							<svg
								className="text-gray-300"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
								fill="currentColor"
								viewBox="0 0 640 512">
								<path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
							</svg>
						</div>
					) : (
						<ImageLoader
							component="img"
							className="h-96 object-fill w-72"
							src={imageUrl}
							alt="Event Poster">
							<div className="flex items-center h-96 w-full px-3 border border-gray-400 p-2 animate-pulse">
								{' '}
								<svg
									className="text-gray-400"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
									fill="currentColor"
									viewBox="0 0 640 512">
									<path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
								</svg>
							</div>
						</ImageLoader>
					)}
				</div>
				<div className="flex flex-row w-full mt-3 justify-between items-center">
					<div className="flex flex-row mx-4 items-center gap-2">
						<p className="text-lg font-normal text-black">{date}</p>
					</div>
					{/* <Button size="small" variant="contained" href={learnMoreLink}>
					More Info
				</Button> */}
				</div>
				<div className="mx-4 mb-3">
					<Typography variant="body2" color="text.secondary" className="truncate">
						{description}
					</Typography>
				</div>
			</div>
		</Link>
	);
}
