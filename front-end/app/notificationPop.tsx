import Alert from '@mui/material/Alert';
import Link from 'next/link';
import {useState} from 'react';

// TODO fetch notifications in this format, flag indicates failure or success notification
// after fetching put setLoading useState to false
type Notification = {
	name: string;
	description: string;
	href: string;
	flag: string;
};

const notifications: Notification[] = [
	{
		name: 'Event Name 1',
		description: 'Congratulations! Your application has been approved.',
		href: '/details/9',
		flag: 'success',
	},
	{
		name: 'Event Name 2',
		description: 'Unfortunately, your application has been denied.',
		href: '/details/9',
		flag: 'failure',
	},
	{
		name: 'Event Name 3',
		description: 'Your event proposal has been denied.',
		href: '/details/9',
		flag: 'failure',
	},
	{
		name: 'Event Name 4',
		description: 'Your event proposal has been approved.',
		href: '/details/9',
		flag: 'success',
	},
	{
		name: 'Event Name 3',
		description: 'Your event proposal has been denied.',
		href: '/details/9',
		flag: 'failure',
	},
	{
		name: 'Event Name 4',
		description: 'Your event proposal has been approved.',
		href: '/details/9',
		flag: 'success',
	},
	{
		name: 'Event Name 3',
		description: 'Your event proposal has been denied.',
		href: '/details/9',
		flag: 'failure',
	},
	{
		name: 'Event Name 4',
		description: 'Your event proposal has been approved.',
		href: '/details/9',
		flag: 'success',
	},
];

function Loading() {
	return (
		<div
			role="status"
			className="relative gap-3 bg-white p-2 flex flex-col h-96 overflow-auto">
			<div className="h-12 bg-gray-200 rounded-md animate-pulse"></div>
			<div className="h-12 bg-gray-200 rounded-md animate-pulse"></div>
			<div className="h-12 bg-gray-200 rounded-md animate-pulse"></div>
			<div className="h-12 bg-gray-200 rounded-md animate-pulse"></div>
			<div className="h-12 bg-gray-200 rounded-md animate-pulse"></div>
			<div className="h-12 bg-gray-200 rounded-md animate-pulse"></div>
		</div>
	);
}

export default function Notifications() {
	const [loading, setLoading] = useState(false);
	return (
		<div className="fixed right-24 sm:right-28 w-full md:max-w-sm">
			<div className="absolute left-1/2 z-10 mt-3 w-[23rem] md:max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
				<div className="border -mt-1 border-gray-300 overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
					<div className="bg-gray-200 p-4 py-2">
						<span className="flex items-center">
							<span className="text-lg font-normal text-black">Notifications</span>
						</span>
					</div>
					{loading ? (
						<Loading></Loading>
					) : (
						<div className="relative gap-3 bg-white p-2 flex flex-col h-96 overflow-auto notification">
							{notifications.length === 0 ? (
								<div className="flex w-full h-full justify-center items-center">
									No new notifications!
								</div>
							) : (
								notifications.map((item, index) => (
									<Link key={index} href={item.href}>
										<Alert severity={item.flag === 'success' ? 'success' : 'error'}>
											<p className="font-bold">{item.name}</p>
											<p>{item.description}</p>
										</Alert>
									</Link>
								))
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
