import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import {styled} from '@mui/material/styles';
import Link from 'next/link';
import * as React from 'react';
import API from '../API';
import {TimeLineHistory} from '../datainterface';
import Timeline, {waitingLabel} from './timeline';
import {useRouter} from 'next/navigation';

const activeStatus = (history: any) => {
	let currentStep = 0;
	if (history) {
		for (let i = history.length - 1; i >= 0; i--) {
			if (history[i].status === 2) {
				console.log(history[i].success_title);
				currentStep = i + 1;
				break;
			}
			if (history[i].status === -1 || history[i].status === 1) {
				currentStep = i;
				break;
			}
		}
	}

	let label = '',
		isRejected = false;
	if (waitingLabel[currentStep] !== '') {
		label = waitingLabel[currentStep];
	}
	if (history && currentStep <= 9 && history[currentStep].status === -1) {
		isRejected = true;
		label = history[currentStep].failure_title;
	}
	return [isRejected, label];
};

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

export default function ProfileCards(props: {
	title: string;
	club: string;
	pk: number;
	eventStatus: string;
	current?: number;
	applicationStatus?: string;
	description?: string;
	failed?: number;
	failedLabel?: string | string[];
	variant?: 'organiser' | '';
	history?: TimeLineHistory[];
}) {
	const router = useRouter();

	const navigateIfRequired = (variant?: 'organiser' | '') => {
		variant === 'organiser' ? '' : router.push(link);
	};

	const [expanded, setExpanded] = React.useState(false);
	let applicationStatus = '';
	if (API.get_user_detail().role.toLowerCase() === 'student') {
		applicationStatus = props.applicationStatus || '';
	}
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const [alert, setAlert] = React.useState(0); // 0 indicates not to show alert, 1 approve, 2 reject
	const link = '/details/' + props.pk;

	const [isRejected, label] = activeStatus(props.history);

	return (
		<div
			onClick={() => navigateIfRequired(props.variant)}
			className={
				props.variant === 'organiser'
					? 'w-full border border-gray-300 sm:hover:border-blue-300 sm:hover:shadow-md transition-all duration-300 rounded-sm cursor-default'
					: 'w-full border border-gray-300 sm:hover:border-blue-300 sm:hover:shadow-md transition-all duration-300 rounded-sm cursor-pointer'
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
							<></>
						)
					}
					title={
						<div className="flex flex-row items-center">
							<span>{props.title}</span>
							{props.variant === 'organiser' && (
								<span className="text-sm p-1 pb-0 rounded-sm text-[#017efc]">{`(${props.eventStatus})`}</span>
							)}
						</div>
					}
					subheader={
						<div className="flex flex-col">
							<p>{props.club}</p>
							{props.variant === 'organiser' && (
								<p className={isRejected ? 'text-red-600' : 'text-[#017efc]'}>
									{label}
								</p>
							)}
						</div>
					}
				/>
				{props.variant === 'organiser' ? (
					<>
						<p className="-mt-4 px-4 w-72 sm:w-96 lg:w-[42rem] font-light text-gray-700 truncate">
							{props.description}
						</p>
						<CardActions className="-mt-7" disableSpacing>
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
									className="w-6 h-6 mr-[0.1rem]">
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
								<Timeline history={props.history} />
							</CardContent>
						</Collapse>
					</>
				) : (
					<div className="flex flex-row gap-2 m-2 ml-4 -mt-5 justify-center items-center w-36 py-2 rounded-md">
						{(() => {
							if (props.eventStatus === 'Completed') {
								return (
									<span className="flex justify-center bg-green-100 w-full text-green-800 text-sm py-2 font-medium rounded-md">
										Completed
									</span>
								);
							} else if (
								props.eventStatus === 'Pending' ||
								applicationStatus === 'Pending'
							) {
								return (
									<span className="flex justify-center bg-yellow-100 w-full text-yellow-800 text-sm py-2 font-medium rounded-md">
										Pending
									</span>
								);
							} else if (
								props.eventStatus === 'Accepted' ||
								applicationStatus === 'Accepted'
							) {
								return (
									<span className="flex justify-center bg-blue-100 w-full text-[#1976d2] text-sm py-2 font-medium rounded-md">
										Accepted
									</span>
								);
							} else if (
								props.eventStatus === 'Rejected' ||
								applicationStatus === 'Rejected'
							) {
								return (
									<span className="flex justify-center bg-red-100 w-full text-red-800 text-sm py-2 font-medium rounded-md">
										Rejected
									</span>
								);
							} else if (
								props.eventStatus === 'Certified' ||
								applicationStatus === 'Certified'
							) {
								return (
									<span className="flex justify-center bg-purple-100 w-full text-purple-800 text-sm py-2 font-medium rounded-md">
										Certified
									</span>
								);
							} else {
								return <></>;
							}
						})()}
					</div>
				)}
			</Card>
		</div>
	);
}
