'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import LoginForm from './loginForm'
import LandingNav from './landingNav'
import Footer from './footer'

export default function Login(): JSX.Element {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <div className='flex flex-col w-full min-h-screen'>
      <LandingNav></LandingNav>
      <div className='flex flex-col flex-grow w-full h-full justify-center items-center relative'>
        <div
          className='absolute top-0 left-0 w-full h-full z-0 bg-center'
          style={{
            backgroundImage: "url('/college.svg')",
            filter: 'blur(5px)',
          }}
        ></div>
        <div
          className='flex flex-col w-11/12 sm:w-10/12 md:w-5/12 bg-white 
      opacity-95 rounded-xl px-8 py-12 shadow-xl z-10 relative'
        >
          {loading ? (
            <div className='shadow rounded-md p-4 w-full h-48'>
              <div className='animate-pulse flex'>
                <div className='flex-1 space-y-6 py-1'>
                  <div className='space-y-3'>
                    <div className='grid grid-cols-3 gap-4'>
                      <div className='h-8 bg-slate-400 rounded col-span-2'></div>
                      <div className='h-8 bg-slate-400 rounded col-span-1'></div>
                    </div>
                    <div className='h-8 bg-slate-400 rounded'></div>
                  </div>
                  <div className='grid grid-cols-3 gap-4'>
                    <div className='h-8 bg-slate-400 rounded col-span-2'></div>
                    <div className='h-8 bg-slate-400 rounded col-span-1'></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className='font-roboto text-4xl font-semibold'>Sign-in</h1>
              <h2 className='font-roboto text-lg'>
                Don&apos;t have an account? &nbsp;
                <Link href='/register'>
                  <span className='text-blue-600 -ml-1 hover:underline'>
                    Register
                  </span>
                </Link>
              </h2>
              <LoginForm></LoginForm>
            </>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}
