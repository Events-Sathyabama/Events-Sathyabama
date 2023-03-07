'use client'
import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

function signOut() {
  localStorage.clear()
  if (typeof window !== 'undefined') {
    window.location.href = '/'
  }
}

export default function Navbar() {
  const [currentPage, setCurrentPage] = useState(0) //initially to Upcoming
  const navigator = usePathname()
  useEffect(() => {
    if (navigator === '/home/upcoming') {
      setCurrentPage(1)
    } else if (navigator === '/home/ongoing') {
      setCurrentPage(2)
    } else if (navigator === '/home/completed') {
      setCurrentPage(3)
    } else {
      setCurrentPage(-1)
    }
  }, [navigator])
  return (
    <Disclosure as='div' className='bg-white border-b-2 border-gray-100'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-black font-bold'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-8 w-8' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-8 w-8' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex w-full items-center justify-center sm:items-stretch sm:justify-start'>
                <Link
                  href='/home/upcoming'
                  className='flex flex-row items-center gap-3'
                >
                  <img src='/logo.svg' className='h-12 w-12'></img>
                  <h1 className='text-3xl font-roboto text-black font-semibold hidden lg:block'>
                    Events@Sathyabama
                  </h1>
                </Link>
                <div className='hidden sm:ml-6 sm:flex justify-center flex-grow'>
                  <div className='flex h-full items-center space-x-4'>
                    <Link
                      href='/home/upcoming'
                      className={
                        currentPage === 1
                          ? 'bg-gray-800 p-2 rounded-md text-lg text-white'
                          : 'text-black hover:scale-110 transition-all hover:bg-blue-50 rounded-md px-3 py-2 text-lg font-roboto'
                      }
                    >
                      Upcoming
                    </Link>
                    <Link
                      href='/home/ongoing'
                      className={
                        currentPage === 2
                          ? 'bg-gray-800 p-2 rounded-md text-lg text-white'
                          : 'text-black hover:scale-110 transition-all hover:bg-blue-50 rounded-md px-3 py-2 text-lg font-roboto'
                      }
                    >
                      Ongoing
                    </Link>
                    <Link
                      href='/home/completed'
                      className={
                        currentPage === 3
                          ? 'bg-gray-800 p-2 rounded-md text-lg text-white'
                          : 'text-black hover:scale-110 transition-all hover:bg-blue-50 rounded-md px-3 py-2 text-lg font-roboto'
                      }
                    >
                      Completed
                    </Link>
                  </div>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {/* Profile dropdown */}
                <Menu as='div' className='relative ml-3'>
                  <div>
                    <Menu.Button className='flex rounded-full text-sm'>
                      <span className='sr-only'>Open user menu</span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-10 h-10'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                      </svg>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href='/profile'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-lg text-gray-700'
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => signOut()}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-lg text-gray-700 w-full text-left'
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 px-2 pt-2 pb-3'>
              <Disclosure.Button
                as={Link}
                href='/home/upcoming'
                className={classNames(
                  currentPage === 1 ? 'bg-gray-900 text-white' : 'text-black',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
              >
                Upcoming Events
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                href='/home/ongoing'
                className={classNames(
                  currentPage === 2 ? 'bg-gray-900 text-white' : 'text-black',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
              >
                Ongoing Events
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                href='/home/completed'
                className={classNames(
                  currentPage === 3 ? 'bg-gray-900 text-white' : 'text-black',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
              >
                Completed Events
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
