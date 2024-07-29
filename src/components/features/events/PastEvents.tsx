'use client'

import GridContainer from '@/components/ui/containers/GridContainer'
import EVENTS from '@/consts/Events'
import React, { useEffect } from 'react'

import EventCard from './EventCard'

const PastEvents = () => {
  useEffect(() => {
    console.log('PAST EVENTS COMPONENT MOUNTED')
  }, [])

  return (
    <GridContainer>
      {EVENTS.map(event => (
        <EventCard key={event?.name} event={event} />
      ))}
    </GridContainer>
  )
}

export default PastEvents
