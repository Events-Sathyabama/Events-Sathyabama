export default function Footer(): JSX.Element {
  return (
    <div className='flex flex-col w-full h-auto my-3 px-2 justify-center items-center'>
      <h1 className='text-sm text-center font-roboto text-gray-600 font-semibold'>
        © Developed for Sathyabama University by
        <a
          href='https://www.linkedin.com/in/bandepalli-surya/'
          target='_blank'
          className='ml-1 underline'
        >
          Surya
        </a>{' '}
        and{' '}
        <a
          href='https://www.linkedin.com/in/aryan-amish/'
          target='_blank'
          className='underline'
        >
          Aryan
        </a>
        .
      </h1>
    </div>
  )
}
