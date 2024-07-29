'use client'

import GridContainer from '@/components/ui/containers/GridContainer'
import EVENTS from '@/consts/Events'
import React, { useEffect } from 'react'

import EventCard from './EventCard'

const MyEvents = () => {
  useEffect(() => {
    console.log('MY EVENTS COMPONENT MOUNTED')
  }, [])

  return (
    <GridContainer>
      {EVENTS.map(event => (
        <EventCard key={event?.name} event={event} />
      ))}
    </GridContainer>
  )
}

export default MyEvents
