'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

export default function TabsProfile() {
  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }} className="mt-4 md:mt-0">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab
              label='Registered Events'
              value='1'
              sx={{ textTransform: 'none', fontSize: '1.25rem' }}
            />
            <Tab
              label='Completed Events'
              value='2'
              sx={{ textTransform: 'none', fontSize: '1.25rem' }}
            />
          </TabList>
        </Box>
        <TabPanel value='1'>Registered Events Here</TabPanel>
        <TabPanel value='2'>Completed Events Here</TabPanel>
      </TabContext>
    </Box>
  )
}
