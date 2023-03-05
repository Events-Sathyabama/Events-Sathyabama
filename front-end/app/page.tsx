import Link from 'next/link'
import LoginForm from './loginForm'
export default function Login(): JSX.Element {
  return (
    <div className='flex flex-col flex-grow w-full h-full justify-center items-center'>
      <div className='flex flex-col w-11/12 sm:w-10/12 md:w-5/12 border border-gray-700 rounded-xl px-8 py-12 shadow-xl'>
        <h1 className='font-roboto text-4xl font-semibold'>Sign-in</h1>
        <h2 className='font-roboto text-lg'>
          Don&apos;t have an account? &nbsp;
          <Link href='/register'>
            <span className='text-blue-600 -ml-1 hover:underline'>Register</span>
          </Link>
        </h2>
        <LoginForm></LoginForm>
      </div>
    </div>
  )
}
