import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

interface HomeCardProps {
  title: string
  subheader: string
  imageUrl: string
  description: string
  date: string
  learnMoreLink: string
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function HomeCard(props: HomeCardProps) {
  const { title, subheader, imageUrl, description, date, learnMoreLink } = props
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{ maxWidth: 345 }} className="border border-gray-200">
      <CardHeader
        title={<div className='w-80 truncate'>{title}</div>}
        subheader={<div className='w-80 truncate'>{subheader}</div>}
      />
      <CardMedia
        component='img'
        image={imageUrl}
        alt='Event Poster'
        className='h-96 object-fill px-2'
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary' className='truncate'>
          {description}
        </Typography>
      </CardContent>
      <CardContent className='flex flex-row w-full -mt-2 h-10 justify-between items-center'>
        <div className='flex flex-row gap-1 items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 text-[#3c8bd9]'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z'
            />
          </svg>
          <p className='text-md font-semibold'>{date}</p>
        </div>
        <Button size='small' variant='contained' href={learnMoreLink}>
           More Info
        </Button>
      </CardContent>
    </Card>
  )
}
