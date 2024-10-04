'use client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/common/Heading'
import Navbar from '@/components/ui/common/Navbar'
import GridContainer from '@/components/ui/containers/GridContainer'
import { useToast } from '@/components/ui/use-toast'
import EVENTS from '@/consts/Events'
import useApi from '@/hooks/useApi'
import { getToken } from '@/store/reducers/authSlice'
import { EventListResponse } from '@/types'
import { SquarePlus } from 'lucide-react'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import AvatarStack from '../users/AvatarStack'
import UserAvatar from '../users/UserAvatar'
import EventCard from './EventCard'

const eventCode = '1b9-2df' //this is a dummy event code
const EventCheckIn = ({ event }: { event: Event }) => {
  const token = useSelector(getToken)
  const { toast } = useToast()

  const { fetchData, data: profileData } = useApi<any, any>()
  useEffect(() => {
    console.log('MY EVENTS COMPONENT MOUNTED')
  }, [])

  const mappedUser = {
    fullname: profileData?.data?.user?.fullname,
    profilePhoto: profileData?.data?.user?.profilePhoto,
    professionalTitle: profileData?.data?.user?.professionalTitle,
    workplace: profileData?.data?.user?.workplace,
    bio: profileData?.data?.user?.bio,
    linkedIn: profileData?.data?.user?.linkedIn,
    location: profileData?.data?.user?.location,
  }

  useEffect(() => {
    const getEventList = async () => {
      try {
        if (token) {
          await fetchData('events/eventCode', token)
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
  return (
    <>
      <div className='flex flex-col lg:flex-row'>
        <div className='flex flex-row justify-between sm:flex-col sm:gap-4 lg:h-full lg:w-full'>
          {EVENTS && (
            <GridContainer>
              {EVENTS.filter(event => event.eventCode === eventCode).map(event => (
                <EventCard key={event?.name} event={event as any} />
              ))}
            </GridContainer>
          )}
          <Button variant='ghost' className='hidden items-center justify-center gap-2 md:flex'>
            
            <span className='font-medium'>Confirm Event</span>
          </Button>
        </div>
        <div className='flex flex-col gap-2 py-4 px-2'>
          <Heading type='tertiary'>Confirm Profile </Heading>
          <div>
            <div className='flex flex-row  gap-2'>
              <div className="flex flex-col">
              <UserAvatar
                image={{
                  src: mappedUser?.profilePhoto || null,
                  alt: `Profile Image of User`,
                }}
                fallbackProfile={mappedUser.fullname}
              />
              <p className="font-meduim text-sm">{mappedUser.fullname}</p>
              <p></p>
              </div>
              <div>
                <h3>{mappedUser.professionalTitle}</h3>
                <p>{mappedUser.location}</p>
              </div>
            </div>
          </div>
          <Button variant='link' className='text-lg'>
            
            <span className='font-medium'>Confirm Event</span>
          </Button>
        </div>
      </div>
    </>
  )
}

export default EventCheckIn
