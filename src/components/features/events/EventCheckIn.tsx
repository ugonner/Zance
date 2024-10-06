'use client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/common/Heading'
import GridContainer from '@/components/ui/containers/GridContainer'
import { useToast } from '@/components/ui/use-toast'
import EVENTS from '@/consts/Events'
import useApi from '@/hooks/useApi'
import { getLoggedInUser, getToken } from '@/store/reducers/authSlice'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import AvatarStack from '../users/AvatarStack'
import UserAvatar from '../users/UserAvatar'
import EventCard from './EventCard'
import { IApiResponse, IUserProfile, User } from '../../../types'
import { Event } from '@/types'
import { Skeleton } from '../../ui/skeleton'

const eventCode = '1b9-2df' //this is a dummy event code
export const EventCheckIn = ({ eventCode, userEmail }: { eventCode: string; userEmail: string }) => {
  const token = useSelector(getToken)
  const loggedInUser = useSelector(getLoggedInUser);
  const { toast } = useToast()

  const {  loading, fetchData } = useApi<any, any>()
  const [event, setEvent] = useState<Event>()
  const [user, setUser] = useState<IUserProfile>(loggedInUser?.profile as IUserProfile);
  useEffect(() => {
    console.log('MY EVENTS COMPONENT MOUNTED')
  }, [])


  useEffect(() => {
    const getEventAndUser = async () => {
      try {
        let eventRes: IApiResponse<Event> = {} as unknown as IApiResponse<Event>;
        let userRes: IApiResponse<User> = {} as IApiResponse<User>;
        if (token) {
          eventRes = await fetchData(`events/${eventCode}`, token)
          userRes = await fetchData(`user/${userEmail}`, token)
        }
        if(userRes.data){
          const mappedUser: IUserProfile = {
            fullname: userRes?.data?.profile?.fullname,
            profilePhoto: userRes?.data?.profile?.profilePhoto,
            professionalTitle: userRes?.data?.profile?.professionalTitle,
            workplace: userRes?.data?.profile?.workplace,
            bio: userRes?.data?.profile?.bio,
            location: userRes?.data?.profile?.location,
          };
          setUser(mappedUser);
        }
        if(eventRes.data){
          setEvent(eventRes.data)
        }
        //since we don't have get event by event code endpont; just set to one form EVENTS;
        setEvent(EVENTS.find((evt) => evt.eventCode === eventCode) as unknown as Event)
        
      } catch (err) {
        toast({
          variant: 'destructive',
          title: `Something went wrong while fetching data! ${err}`,
        })
      }
    }
    getEventAndUser();
  }, [userEmail, eventCode])
  if(loading) return <Skeleton  />;
  return (
    <>
      
      <div className='flex flex-col lg:flex-row'>
        <div className='flex flex-row justify-between sm:flex-col sm:gap-4 lg:h-full lg:w-full'>
          {EVENTS && (
            <GridContainer>
             <EventCard event={event as Event} />
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
                  src: user?.profilePhoto || null,
                  alt: `Profile Image of User`,
                }}
                fallbackProfile={user.fullname}
              />
              <p className="font-meduim text-sm">{user.fullname}</p>
              <p></p>
              </div>
              <div>
                <h3>{user.professionalTitle}</h3>
                <p>{user.location}</p>
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
