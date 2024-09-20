'use client'

import EventCard from '@/components/features/events/EventCard'
import EventDetail from '@/components/features/events/EventDetail'
import Heading from '@/components/ui/common/Heading'
import GridContainer from '@/components/ui/containers/GridContainer'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import EVENTS from '@/consts/Events'
import useApi from '@/hooks/useApi'
import { getToken } from '@/store/reducers/authSlice'
import { Event } from '@/types/index'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const EventDetailPage = () => {
  const params = useParams()

  const event = EVENTS.find(event => event._id === params.id)
  const token = useSelector(getToken)

  const { fetchData, loading, error, data: eventDetail } = useApi<{ token: string }, any>()

  const { toast } = useToast()

  const hasError = error && !eventDetail && !loading

  useEffect(() => {
    const getEventDetail = async () => {
      try {
        if (token) {
          await fetchData(`events/${params.id}`, token)
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: `Something went wrong while fetching profile details! ${error}`,
        })
      }
    }
    getEventDetail()
  }, [fetchData, toast, token, params.id])

  // Log eventDetail after it's updated
  useEffect(() => {
    if (eventDetail) {
      console.log('Event Detail:', eventDetail?.data)
    }
  }, [eventDetail])

  return (
    <GridContainer>
      {/* @ts-ignore */}
      {loading ? <Skeleton className='h-12 w-10/12' /> : <EventDetail event={eventDetail?.data} />}
      <section className='col-span-full'>
        <Heading type='tertiary' className='mb-4'>
          Other events like this
        </Heading>
        <GridContainer>
          {EVENTS.map(event => (
            <EventCard key={event?.name} event={event as any} />
          ))}
        </GridContainer>
      </section>
    </GridContainer>
  )
}

export default EventDetailPage
