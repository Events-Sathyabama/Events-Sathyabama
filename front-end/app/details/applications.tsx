'use client'
import { useState } from 'react'
import Button from '@mui/material/Button'

interface Application {
  name: string
  status: number
}

interface ApplicationProps {
  applications: Application[]
}

export default function Applications(props: ApplicationProps) {
  const { applications } = props
  const [updatedApplications, setUpdatedApplications] =
    useState<Application[]>(applications)

  const handleAccept = (index: number) => {
    const updatedStatus = [...updatedApplications]
    updatedStatus[index].status = 1
    setUpdatedApplications(updatedStatus)
  }

  const handleDeny = (index: number) => {
    const updatedStatus = [...updatedApplications]
    updatedStatus[index].status = -1
    setUpdatedApplications(updatedStatus)
  }

  return (
    <div className='flex flex-col w-full -mt-3'>
      {updatedApplications.map((applicant, index) => (
        <div
          key={index}
          className='flex flex-row justify-between items-center mt-3 border-0 border-b pb-2'
        >
          <h1 className='text-xl p-2'>{applicant.name}</h1>
          {applicant.status === 0 && (
            <div className='flex flex-row gap-2'>
              <Button
                variant='contained'
                className='bg-green-600 hover:bg-green-800'
                onClick={() => handleAccept(index)}
              >
                Accept
              </Button>
              <Button
                variant='outlined'
                color='error'
                onClick={() => handleDeny(index)}
              >
                Deny
              </Button>
            </div>
          )}
          {applicant.status === 1 && <p className='text-green-500'>Accepted</p>}
          {applicant.status === -1 && <p className='text-red-500'>Denied</p>}
        </div>
      ))}
    </div>
  )
}
