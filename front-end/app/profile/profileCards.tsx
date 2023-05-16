import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Link from 'next/link';
import Timeline from './timeline';

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

export default function ProfileCards(props: any) {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const [alert, setAlert] = React.useState(0); // 0 indicates not to show alert, 1 approve, 2 reject
	const link = '/details/' + props.pk;
	return (
		<Link
			href={props.variant === 'organiser' ? '/profile' : link}
			className={
				props.variant === 'organiser'
					? 'w-full border border-gray-300 sm:hover:border-blue-300 sm:hover:shadow-md transition-all duration-300 rounded-sm cursor-default'
					: 'w-full border border-gray-300 sm:hover:border-blue-300 sm:hover:shadow-md transition-all duration-300 rounded-sm'
			}>
			<Card
				sx={{boxShadow: 'none'}}
				className={
					props.eventStatus.toLowerCase() === 'canceled'
						? 'shadow-sm border border-1 border-red-800 shadow-red-800'
						: ''
				}>
				<CardHeader
					action={
						props.variant === 'organiser' ? (
							<Link href={link} passHref>
								<IconButton className="flex p-2 text-gray-500">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
										/>
									</svg>
								</IconButton>
							</Link>
						) : (
							<div className="flex flex-row gap-2 justify-center items-center shadow-sm border border-gray-300 w-36 py-2 rounded-md ml-1">
								{props.eventStatus === 'Pending' ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 text-gray-700">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								) : null}
								{props.eventStatus === 'Accepted' ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 text-blue-500">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 5.25 5.25 0 00-.1-.664m-5.8 0A2.251 5.251 0 0113.5 5.25H15c1.012 0 1.867.668 5.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 5.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 5.192V16.5A2.25 5.25 0 0118 18.75h-5.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
										/>
									</svg>
								) : null}
								{props.eventStatus === 'Rejected' ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 text-red-500">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								) : null}
								{props.eventStatus === 'Completed' ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 text-green-500">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								) : null}
								{props.eventStatus === 'Certified' ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 text-orange-300">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
										/>
									</svg>
								) : null}
								<p className="text-lg">{props.eventStatus}</p>
							</div>
						)
					}
					title={
						props.title +
						(props.eventStatus.toLowerCase() === 'canceled' ? ' (Canceled)' : '')
					}
					subheader={props.club}
				/>
				{props.variant === 'organiser' ? (
					<>
						<p className="-mt-4 px-4 w-72 sm:w-96 lg:w-[42rem] font-light text-gray-700 truncate">
							{props.description}
						</p>
						<CardActions className="-mt-10" disableSpacing>
							<ExpandMore
								expand={expanded}
								onClick={handleExpandClick}
								aria-expanded={expanded}
								aria-label="show more">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</ExpandMore>
						</CardActions>
						<Collapse in={expanded} timeout="auto" unmountOnExit>
							<CardContent>
								<Timeline
									current={props.current}
									failed={props.failed}
									failedLabel={props.failedLabel}></Timeline>
							</CardContent>
						</Collapse>
					</>
				) : null}
			</Card>
		</Link>
	);
}
