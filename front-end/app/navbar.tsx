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
		if (role === 'Teacher' || role === 'HOD' || role === 'Vice-Chancellor') {
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
