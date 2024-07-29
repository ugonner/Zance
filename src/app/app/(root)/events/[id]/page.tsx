'use client'

import EventCard from '@/components/features/events/EventCard'
import EventDetail from '@/components/features/events/EventDetail'
import Heading from '@/components/ui/common/Heading'
import GridContainer from '@/components/ui/containers/GridContainer'
import EVENTS from '@/consts/Events'
import { useParams } from 'next/navigation'
import React from 'react'

const EventDetailPage = () => {
  const params = useParams()

  const event = EVENTS.find(event => event._id === params.id)

  return (
    <GridContainer>
      {/* @ts-ignore */}
      <EventDetail event={event} />
      <section className='col-span-full'>
        <Heading type='tertiary' className='mb-4'>
          Other events like this
        </Heading>
        <GridContainer>
          {EVENTS.map(event => (
            <EventCard key={event?.name} event={event} />
          ))}
        </GridContainer>
      </section>
    </GridContainer>
  )
}

export default EventDetailPage
