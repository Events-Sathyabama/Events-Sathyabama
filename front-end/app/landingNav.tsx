import Link from 'next/link'
import Image from 'next/image'
export default function LandingNav(): JSX.Element {
  return (
    <div className='flex flex-row w-full h-20 justify-center items-center border border-gray-300 shadow-sm'>
      <Link href='/' className="flex flex-row items-center gap-3">
        <img src='/logo.svg' className='h-12 w-12'></img>
        <h1 className='text-3xl font-roboto text-black font-semibold'>
          Events@Sathyabama
        </h1>
      </Link>
    </div>
  )
}
