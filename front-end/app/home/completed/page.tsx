'use client'
import HomeCard from '../card'
// TODO Card Data Render Format Here
// TODO Fetch and Update Dummy Data to Real Data Here
const dummyData = [
  {
    title: 'Spice 2k22',
    subheader: 'School of Computing',
    imageUrl: '/eventPosters/Spice.jpg',
    description: 'Sathyabama Project Innovation Competition and Exhibition',
    date: "29 Aug '23 - 30 Aug '23",
    learnMoreLink: 'https://google.com',
  },
  {
    title: 'Woman Welfare',
    subheader: 'School of Computing - Department of IT',
    imageUrl: '/eventPosters/WomenWelfare.jpg',
    description:
      "Coding and Product Competition",
    date: "7 Mar '23",
    learnMoreLink: 'https://google.com',
  },
  {
    title: 'Spice 2k22',
    subheader: 'School of Computing',
    imageUrl: '/eventPosters/Spice.jpg',
    description: 'Sathyabama Project Innovation Competition and Exhibition',
    date: "29 Aug '23 - 30 Aug '23",
    learnMoreLink: 'https://google.com',
  },
  {
    title: 'Woman Welfare',
    subheader: 'School of Computing - Department of IT',
    imageUrl: '/eventPosters/WomenWelfare.jpg',
    description:
      "Coding and Product Competition",
    date: "7 Mar '23",
    learnMoreLink: 'https://google.com',
  },
  {
    title: 'Spice 2k22',
    subheader: 'School of Computing',
    imageUrl: '/eventPosters/Spice.jpg',
    description: 'Sathyabama Project Innovation Competition and Exhibition',
    date: "29 Aug '23 - 30 Aug '23",
    learnMoreLink: 'https://google.com',
  },
]

export default function Completed() {
  return (
    <div className='flex flex-col w-full h-full'>
      <h1 className='text-2xl text-center underline mt-3'>Completed Events</h1>
      <div className='flex flex-row flex-wrap m-3 justify-center gap-3'>
        {dummyData.map((card) => (
          <HomeCard
            title={card.title}
            subheader={card.subheader}
            imageUrl={card.imageUrl}
            description={card.description}
            date={card.date}
            learnMoreLink={card.learnMoreLink}
          />
        ))}
      </div>
    </div>
  )
}
