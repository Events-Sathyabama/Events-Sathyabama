import Link from 'next/link'
import LoginForm from './loginForm'
export default function Login(): JSX.Element {
  return (
    <div className='flex flex-col flex-grow w-full h-full justify-center items-center relative'>
      <div
        className='absolute top-0 left-0 w-full h-full z-0 bg-center'
        style={{ backgroundImage: "url('/college.svg')", filter: 'blur(5px)' }}
      ></div>
      <div
        className='flex flex-col w-11/12 sm:w-10/12 md:w-5/12 bg-white 
      opacity-95 rounded-xl px-8 py-12 shadow-xl z-10 relative'
      >
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
      </div>
    </div>
  )
}
