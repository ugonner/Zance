'use client'

import EventCard from '@/components/features/events/EventCard'
import EventDetail from '@/components/features/events/EventDetail'
import TagCard from '@/components/features/events/TagCard'
import AvatarStack from '@/components/features/users/AvatarStack'
import { Button } from '@/components/ui/button'
import Description from '@/components/ui/common/Description'
import Heading from '@/components/ui/common/Heading'
import GridContainer from '@/components/ui/containers/GridContainer'
import { Separator } from '@/components/ui/separator'
import EVENTS from '@/consts/Events'
import { CalendarDays, Clock9, Copy, File, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'

const EventDetailPage = () => {
  const params = useParams()

  const event = EVENTS.find(event => event._id === params.id)

  return (
    <GridContainer>
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
