'use client'
import HomeCard from '../card'

// TODO Card Data Render Format Here
// TODO Fetch and Update Dummy Data to Real Data Here
const dummyData = [
  {
    title: 'Madhugai - The Strength',
    subheader: 'SDC - Community Development Club',
    imageUrl: '/eventPosters/Madhugai.jpg',
    description:
      "Outreach Program on the eve of Women's day at Sathyabama Adopted Schools. Health and Hygiene Kit Distribution to Girl Students.",
    date: "7 Mar '23 - 8 Mar '23",
    learnMoreLink: '/details',
  },
  {
    title: 'Winovate',
    subheader: 'Microsoft Club and AICTE Innovation Club',
    imageUrl: '/eventPosters/Winovate.jpg',
    description: 'Windows Customisation Battle',
    date: "9 Mar '23",
    learnMoreLink: 'https://google.com',
  },
  {
    title: 'Madhugai - The Strength',
    subheader: 'SDC - Community Development Club',
    imageUrl: '/eventPosters/Madhugai.jpg',
    description:
      "Outreach Program on the eve of Women's day at Sathyabama Adopted Schools. Health and Hygiene Kit Distribution to Girl Students.",
    date: "7 Mar '23 - 8 Mar '23",
    learnMoreLink: 'https://google.com',
  },
  {
    title: 'Winovate',
    subheader: 'Microsoft Club and AICTE Innovation Club',
    imageUrl: '/eventPosters/Winovate.jpg',
    description: 'Windows Customisation Battle',
    date: "9 Mar '23",
    learnMoreLink: 'https://google.com',
  },
  {
    title: 'Madhugai - The Strength',
    subheader: 'SDC - Community Development Club',
    imageUrl: '/eventPosters/Madhugai.jpg',
    description:
      "Outreach Program on the eve of Women's day at Sathyabama Adopted Schools. Health and Hygiene Kit Distribution to Girl Students.",
    date: "7 Mar '23 - 8 Mar '23",
    learnMoreLink: 'https://google.com',
  },
  {
    title: 'Winovate',
    subheader: 'Microsoft Club and AICTE Innovation Club',
    imageUrl: '/eventPosters/Winovate.jpg',
    description: 'Windows Customisation Battle',
    date: "9 Mar '23",
    learnMoreLink: 'https://google.com',
  },
  {
    title: 'Madhugai - The Strength',
    subheader: 'SDC - Community Development Club',
    imageUrl: '/eventPosters/Madhugai.jpg',
    description:
      "Outreach Program on the eve of Women's day at Sathyabama Adopted Schools. Health and Hygiene Kit Distribution to Girl Students.",
    date: "7 Mar '23 - 8 Mar '23",
    learnMoreLink: 'https://google.com',
  },
]

export default function Upcoming() {
  return (
    <div className='flex flex-col w-full h-full'>
      <h1 className='text-2xl text-center underline mt-3'>Upcoming Events</h1>
      <div className='flex flex-row flex-wrap m-3 justify-center gap-3'>
        {dummyData.map((card, index) => (
          <HomeCard
            key={index}
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
