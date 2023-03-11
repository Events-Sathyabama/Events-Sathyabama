'use client'
import HomeCard from '../card'
import {useEffect, useState} from 'react';
import API from '../../API';

const axios = new API.Axios();
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
      <h1 className='text-2xl text-center underline mt-3'>Ongoing Events</h1>
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
