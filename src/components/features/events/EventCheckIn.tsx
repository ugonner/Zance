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
import { IApiResponse, IEventCheckInDetail, IUserProfile, User } from '../../../types'
import { Event } from '@/types'
import { Skeleton } from '../../ui/skeleton'
import { useRouter } from 'next/navigation'
import { ConfirmEventDialog } from './ConfirmEventDialog'
import ROUTES from '../../../consts/Routes'

const eventCode = '1b9-2df' //this is a dummy event code
export const EventCheckIn = ({ eventCode, userEmail }: { eventCode: string; userEmail: string }) => {
  const loggedInUser = useSelector(getLoggedInUser);
  const { toast } = useToast()

  const {  loading,createData, fetchData } = useApi<any, any>()
  const [event, setEvent] = useState<Event>()
  const [user, setUser] = useState<IUserProfile>(loggedInUser?.profile as IUserProfile);
   const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmDescription, setConfirmDescription] = useState("");

  useEffect(() => {
    console.log('MY EVENTS COMPONENT MOUNTED')
  }, [])


  useEffect(() => {
    const validateEvent = async () => {
      try {
        const res = await createData(`events/checkin/validate`, {
          email: userEmail, eventCode
        }) as IApiResponse<IEventCheckInDetail>;
        if(res.data){
          setEvent(res.data?.eventDetails as Event);
          setUser(res.data?.attendeeDetails as IUserProfile)
        }
      } catch (err) {
        toast({
          variant: 'destructive',
          title: `Something went wrong while fetching data! ${err}`,
        })
        
      setConfirmTitle("Error Checking In");
      setConfirmDescription((err as Error).message)
      setConfirmOpen(true);
      }
    }
    validateEvent();
  }, [userEmail, eventCode])

  const confirmEvent = async () => {
    try{
      const res = await createData(`/events/checkin/confirm`, {
        email: userEmail,
        eventCode
      });
      if(res.data) {
        setConfirmTitle("Congratulations");
        setConfirmDescription("You have been checked in to this event")
        setConfirmOpen(true);
      }
    }catch(error){

      setConfirmTitle("Error Checking In");
      setConfirmDescription((error as Error).message)
      setConfirmOpen(true);
    }
  }

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
          <Heading type='tertiary'>Confirm Profile {user?.fullname}  </Heading>
          <div>
            <div className='flex flex-row  gap-2'>
              <div className="flex flex-col">
              <UserAvatar
                image={{
                  src: user?.profilePhoto || null,
                  alt: `Profile Image of User`,
                }}
                fallbackProfile={user?.fullname}
              />
              <p className="font-meduim text-sm">{user?.fullname}</p>
              <p></p>
              </div>
              <div>
                <h3>{user?.professionalTitle}</h3>
                <p>{user?.location}</p>
              </div>
            </div>
          </div>
          <Button variant='link' className='text-lg' onClick={confirmEvent}>
            
            <span  className='font-medium'>Confirm Event</span>
          </Button>
        </div>
        <ConfirmEventDialog
        isOpen={confirmOpen}
        onOpenChange={(confirmOpen) => {}}
        toggleOpen={() => setConfirmOpen(!confirmOpen)}
        title={confirmTitle}
        description={confirmDescription}
        />
      </div>
    </>
  )
}

export default EventCheckIn
