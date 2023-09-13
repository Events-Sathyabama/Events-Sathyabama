'use client';
import {Disclosure, Menu, Transition} from '@headlessui/react';
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {Fragment, useState} from 'react';
import LetterAvatar from './avatar';
// import Notifications from './notificationPop';
// import NotificationIconButton from './notifications';
import useEffect from './useEffect';

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
	const router = useRouter();

	function signOut() {
		if (typeof window === 'undefined') {
			return;
		}
		window.localStorage.clear();
		router.push('/');
	}

	const [currentPage, setCurrentPage] = useState(0); //initially to Upcoming
	const navigator = usePathname();
	useEffect(() => {
		if (navigator === '/home/upcoming') {
			setCurrentPage(1);
		} else if (navigator === '/home/ongoing') {
			setCurrentPage(2);
		} else if (navigator === '/home/completed') {
			setCurrentPage(3);
		} else {
			setCurrentPage(-1);
		}
	}, [navigator]);
	const [isAdmin, setAdmin] = useState(false);
	const [isVC, setIsVC] = useState(false);
	useEffect(() => {
		const role: String = localStorage.getItem('role_name') || '';
		if (
			role === 'Teacher' ||
			role === 'HOD' ||
			role === 'Vice-Chancellor' ||
			role === 'Dean'
		) {
			setAdmin(true);
			if (role === 'Vice-Chancellor') {
				setIsVC(true);
			}
		}
	}, []);

	// TODO fetch notification count
	const [notificationCount, setNotificationCount] = useState(11);

	return (
		<Disclosure
			as="div"
			className="z-10 border-b-2 border-gray-200 sticky top-0 backdrop-filter backdrop-blur-md bg-white bg-opacity-70">
			{({open}) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black font-bold">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-8 w-8" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-8 w-8" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex w-full items-center justify-center sm:items-stretch sm:justify-start">
								<Link
									href="/home/upcoming"
									className="flex flex-row items-center gap-3">
									<img src="/logo.svg" className="h-12 w-12" />
									<h1 className="text-3xl font-roboto text-black font-semibold hidden lg:block">
										Events@Sathyabama
									</h1>
									<svg
										className="text-red-600 -ml-4 -mt-9"
										xmlns="http://www.w3.org/2000/svg"
										width="36"
										height="36"
										viewBox="0 0 36 36">
										<path
											fill="currentColor"
											d="M7.21 14.07h3a1.61 1.61 0 0 1 1.81 1.5a1.44 1.44 0 0 1-.84 1.34a1.67 1.67 0 0 1 1.1 1.53a1.75 1.75 0 0 1-2 1.63H7.21Zm2.71 2.42c.48 0 .82-.28.82-.67s-.34-.65-.82-.65H8.49v1.32Zm.2 2.48a.75.75 0 1 0 0-1.47H8.49V19Z"
											className="clr-i-outline clr-i-outline-path-1"
										/>
										<path
											fill="currentColor"
											d="M14.55 15.23v1.2h3v1.16h-3v1.32h3.33v1.16h-4.62v-6h4.62v1.16Z"
											className="clr-i-outline clr-i-outline-path-2"
										/>
										<path
											fill="currentColor"
											d="M20.41 15.23h-1.87v-1.16h5v1.16H21.7v4.84h-1.29Z"
											className="clr-i-outline clr-i-outline-path-3"
										/>
										<path
											fill="currentColor"
											d="M28 19.12h-2.68l-.38.95H23.5l2.44-6h1.44l2.45 6h-1.45ZM27.55 18l-.89-2.19l-.89 2.19Z"
											className="clr-i-outline clr-i-outline-path-4"
										/>
										<path
											fill="currentColor"
											d="M8.06 30a.84.84 0 0 1-.38-.08a1 1 0 0 1-.62-.92v-4h-4a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h30a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H13.48l-4.71 4.71a1 1 0 0 1-.71.29Zm-4-7h4a1 1 0 0 1 1 1v2.59l3.3-3.3a1 1 0 0 1 .7-.29h19V11h-28Z"
											className="clr-i-outline clr-i-outline-path-5"
										/>
										<path fill="none" d="M0 0h36v36H0z" />
									</svg>
								</Link>
								<div className="hidden sm:ml-6 sm:flex justify-center flex-grow">
									<div className="flex h-full items-center space-x-4">
										<Link
											href="/home/upcoming"
											className={
												currentPage === 1
													? 'bg-gray-800 p-2 rounded-md text-lg text-white'
													: 'text-black hover:scale-110 transition-all hover:bg-blue-50 rounded-md px-3 py-2 text-lg font-roboto'
											}>
											Upcoming
										</Link>
										<Link
											href="/home/ongoing"
											className={
												currentPage === 2
													? 'bg-gray-800 p-2 rounded-md text-lg text-white'
													: 'text-black hover:scale-110 transition-all hover:bg-blue-50 rounded-md px-3 py-2 text-lg font-roboto'
											}>
											Ongoing
										</Link>
										<Link
											href="/home/completed"
											className={
												currentPage === 3
													? 'bg-gray-800 p-2 rounded-md text-lg text-white'
													: 'text-black hover:scale-110 transition-all hover:bg-blue-50 rounded-md px-3 py-2 text-lg font-roboto'
											}>
											Completed
										</Link>
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								{/* Profile dropdown */}
								{/* <Menu as="div">
									<Menu.Button>
										<NotificationIconButton notificationCount={notificationCount} />
									</Menu.Button>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95">
										<Menu.Items>
											<Notifications />
										</Menu.Items>
									</Transition>
								</Menu> */}
								<Menu as="div" className="relative ml-3">
									<div>
										<Menu.Button className="flex rounded-full text-sm">
											<span className="sr-only">Open user menu</span>
											<LetterAvatar width="2.5rem" height="2.5rem" fontSize="1rem" />
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95">
										<Menu.Items className="border border-gray-200 absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											<Menu.Item>
												{({active}) => (
													<Link
														href="/profile"
														className={classNames(
															active ? 'bg-blue-50' : '',
															'block px-4 py-2 text-lg text-gray-700'
														)}>
														Profile
													</Link>
												)}
											</Menu.Item>
											{isVC && (
												<Menu.Item>
													{({active}) => (
														<Link
															href="/admin_panel"
															className={classNames(
																active ? 'bg-blue-50' : '',
																'block px-4 py-2 text-lg text-gray-700'
															)}>
															EMS Admin Panel
														</Link>
													)}
												</Menu.Item>
											)}
											{isAdmin ? (
												<Menu.Item>
													{({active}) => (
														<Link
															href="/event/create"
															className={classNames(
																active ? 'bg-blue-50' : '',
																'block px-4 py-2 text-lg text-gray-700'
															)}>
															Create Event
														</Link>
													)}
												</Menu.Item>
											) : null}
											<Menu.Item>
												{({active}) => (
													<Link
														href="/report"
														className={classNames(
															active ? 'bg-blue-50' : '',
															'block px-4 py-2 text-lg text-gray-700'
														)}>
														Report a Bug
													</Link>
												)}
											</Menu.Item>
											<Menu.Item>
												{({active}) => (
													<button
														id="Sign-Out"
														onClick={() => signOut()}
														className={classNames(
															active ? 'bg-blue-50' : '',
															'block px-4 py-2 text-lg text-gray-700 w-full text-left'
														)}>
														Sign-out
													</button>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>
					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pt-2 pb-3">
							<Disclosure.Button
								as={Link}
								href="/home/upcoming"
								className={classNames(
									currentPage === 1 ? 'bg-gray-900 text-white' : 'text-black',
									'block rounded-md px-3 py-2 text-base'
								)}>
								Upcoming Events
							</Disclosure.Button>
							<Disclosure.Button
								as={Link}
								href="/home/ongoing"
								className={classNames(
									currentPage === 2 ? 'bg-gray-900 text-white' : 'text-black',
									'block rounded-md px-3 py-2 text-base'
								)}>
								Ongoing Events
							</Disclosure.Button>
							<Disclosure.Button
								as={Link}
								href="/home/completed"
								className={classNames(
									currentPage === 3 ? 'bg-gray-900 text-white' : 'text-black',
									'block rounded-md px-3 py-2 text-base'
								)}>
								Completed Events
							</Disclosure.Button>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
