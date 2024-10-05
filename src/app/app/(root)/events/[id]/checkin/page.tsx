'use client'

import EventCard from '@/components/features/events/EventCard'
import GridContainer from '@/components/ui/containers/GridContainer'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import EVENTS from '@/consts/Events'
import useApi from '@/hooks/useApi'
import { getToken } from '@/store/reducers/authSlice'
import { Event, IApiResponse } from '@/types/index'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EventCheckIn from '../../../../../../components/features/events/EventCheckIn'

const EventCheckinPage = () => {
  const params = useParams()
  const [eventCode, setEventCode] = useState(params.id);
  const event = EVENTS.find(event => event._id === params.id)
  const token = useSelector(getToken)

  const { fetchData, loading, error, data: eventDetail } = useApi<{ token: string }, IApiResponse<Event>>()

  const { toast } = useToast()

  const hasError = error && !eventDetail && !loading

  useEffect(() => {
    const getEventDetail = async () => {
      try {
        if (token) {
        // call get event by eventcode when it's ready
          await fetchData(`events/${eventCode}`, token)
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: `Something went wrong while fetching profile details! ${error}`,
        })
      }
    }
    getEventDetail()
  }, [eventCode])

  // Log eventDetail after it's updated
  useEffect(() => {
    if (eventDetail) {
      console.log('Event checkin', eventDetail?.data)
    }
  }, [eventDetail])

  return (
    <GridContainer>
      {/* @ts-ignore */}
      {loading ? <Skeleton className='h-12 w-10/12' /> : <EventCheckIn event={eventDetail?.data} />}
    
    </GridContainer>
  )
}

export default EventCheckinPage
