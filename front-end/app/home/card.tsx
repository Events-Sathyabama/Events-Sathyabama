import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

interface HomeCardProps {
	title: string;
	subheader: string;
	imageUrl: string;
	description: string;
	date: string;
	learnMoreLink: string;
}

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const {expand, ...other} = props;
	return <IconButton {...other} />;
})(({theme, expand}) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default function HomeCard(props: HomeCardProps) {
	const {title, subheader, imageUrl, description, date, learnMoreLink} = props;
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Link href={learnMoreLink}>
			<Card
				sx={{maxWidth: 345}}
				className="border border-gray-200 hover:scale-105 hover:shadow-lg hover:border-blue-500 hover:my-2 hover:mx-1 transition-all duration-300">
				<CardHeader
					title={<div className="w-80 truncate">{title}</div>}
					subheader={<div className="w-80 truncate">{subheader}</div>}
				/>
				<div className="flex w-full justify-center items-center">
					<img
						src={imageUrl}
						alt="Event Poster"
						className="h-96 object-fill px-2 w-full"></img>
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
			</Card>
		</Link>
	);
}
