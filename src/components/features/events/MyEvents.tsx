'use client'

import GridContainer from '@/components/ui/containers/GridContainer'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import EVENTS from '@/consts/Events'
import useApi from '@/hooks/useApi'
import { getToken } from '@/store/reducers/authSlice'
import { EventListResponse } from '@/types/index'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import EventCard from './EventCard'

const MyEvents = () => {
  const token = useSelector(getToken)
  const { toast } = useToast()

  const {
    fetchData,
    loading,
    error,
    data: eventListData,
  } = useApi<{ token: string }, EventListResponse>()
  useEffect(() => {
    console.log('MY EVENTS COMPONENT MOUNTED')
  }, [])

  const hasError = error && !eventListData && !loading

  useEffect(() => {
    const getEventList = async () => {
      try {
        if (token) {
          await fetchData('events/user/my_events', token)
        }
      } catch (err) {
        toast({
          variant: 'destructive',
          title: `Something went wrong while fetching data! ${err}`,
        })
      }
    }
    getEventList()
  }, [fetchData, toast, token])

  // return (
  //   <GridContainer>
  //     {EVENTS.map(event => (
  //       <EventCard key={event?.name} event={event} />
  //     ))}
  //   </GridContainer>
  // )
  return (
    <>
      {loading ? (
        <Skeleton className='h-12 w-10/12' />
      ) : (
        <>
          {eventListData?.data.length ? (
            <GridContainer>
              {eventListData?.data.map(event => <EventCard key={event?.name} event={event} />)}
            </GridContainer>
          ) : (
            <div className='p-4 text-center'>
              <h2 className='text-xl font-semibold'>No Events Found</h2>
              <p className='text-gray-500'>
                You currently have no events. Create an event or register for one to get started!
              </p>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default MyEvents
