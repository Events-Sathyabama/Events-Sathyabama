export default function Venues() {
  return (
    <ol className='flex flex-col md:flex-row my-3 mx-2'>
      <li className='mb-6 sm:mb-0'>
        <div className='flex items-center sm:mt-2'>
          <div className='flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full ring-8 ring-gray-100 shrink-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5'
              />
            </svg>
          </div>
          <div className='flex w-full bg-gray-200 h-0.5'></div>
        </div>
        <div className='flex flex-col items-center -mt-2 justify-center md:justify-start md:items-start md:mt-3 md:pr-8'>
          <h3 className='text-2xl font-semibold text-blue-500'>Date:</h3>
          <p className='font-normal text-lg text-gray-600'>
            9th March 2023 - 11th March 2023
          </p>
        </div>
      </li>
      <li className='mb-6 sm:mb-0'>
        <div className='flex items-center sm:mt-2'>
          <div className='flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full ring-8 ring-gray-100 shrink-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <div className='flex w-full bg-gray-200 h-0.5'></div>
        </div>
        <div className='flex flex-col items-center -mt-2 justify-center md:justify-start md:items-start md:mt-3 md:pr-8'>
          <h3 className='text-2xl font-semibold text-blue-500'>Duration:</h3>
          <p className='font-normal text-lg text-gray-600'>10AM - 4PM (5 hours)</p>
        </div>
      </li>
      <li className='mb-6 sm:mb-0'>
        <div className='flex items-center sm:mt-2'>
          <div className='flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full ring-8 ring-gray-100 shrink-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
              />
            </svg>
          </div>
          <div className='flex w-full bg-gray-200 h-0.5'></div>
        </div>
        <div className='flex flex-col items-center -mt-2 justify-center md:justify-start md:items-start md:mt-3 md:pr-8'>

          <h3 className='text-2xl font-semibold text-blue-500'>Venue:</h3>
          <p className='font-normal text-lg text-gray-600'>
            Ground Floor Lab, CSE Block
          </p>
        </div>
      </li>
    </ol>
  )
}
