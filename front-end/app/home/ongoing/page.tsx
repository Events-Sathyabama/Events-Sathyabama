'use client'
import HomeCard from '../card'
// TODO Card Data Render Format Here
// TODO Fetch and Update Dummy Data to Real Data Here
const dummyData = [
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
    title: 'International Workshop on Design Thinking and Innovation',
    subheader: 'School of Computing - Department of IT',
    imageUrl: '/eventPosters/Taylor.jpg',
    description: 'Workshop on Design Thinking and Innovation',
    date: "27 Feb '23",
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
    title: 'International Workshop on Design Thinking and Innovation',
    subheader: 'School of Computing - Department of IT',
    imageUrl: '/eventPosters/Taylor.jpg',
    description: 'Workshop on Design Thinking and Innovation',
    date: "27 Feb '23",
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
    title: 'International Workshop on Design Thinking and Innovation',
    subheader: 'School of Computing - Department of IT',
    imageUrl: '/eventPosters/Taylor.jpg',
    description: 'Workshop on Design Thinking and Innovation',
    date: "27 Feb '23",
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
]

export default function Ongoing() {
  return (
    <div className='flex flex-col w-full h-full'>
      <h1 className='text-2xl text-center underline mt-3'>Ongoing Events</h1>
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
