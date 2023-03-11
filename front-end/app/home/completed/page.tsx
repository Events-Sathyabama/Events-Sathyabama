'use client'
import HomeCard from '../card'
import {useEffect, useState} from 'react';
import API from '../../API';

const axios = new API.Axios();
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
  let abc: {
    pk:string,
    title:string,
    club:string,
    image:string,
    short_description:string,
    date:string,
  }[] = []
  const [data, setData] = useState(abc);

  useEffect(()=>{
    (async ()=>{
      const request = await axios.get(API.get_url('event:completed_list'));
      if(request.status === 200){
        setData(request.data);
        console.log(request.data);
      }
    })()
  }, []);
  return (
    <div className='flex flex-col w-full h-full'>
      <h1 className='text-2xl text-center underline mt-3'>Completed Events</h1>
      <div className='flex flex-row flex-wrap m-3 justify-center gap-3'>
        {data ? data.map((card) => (
          <HomeCard
            key={card.pk}
            title={card.title}
            subheader={card.club}
            imageUrl={card.image}
            description={card.short_description}
            date={card.date}
            learnMoreLink={"/details/" + card.pk}
          />
        )): ''}
      </div>
    </div>
  )
}
