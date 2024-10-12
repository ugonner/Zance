'use client'

import EventCard from '@/components/features/events/EventCard'
import GridContainer from '@/components/ui/containers/GridContainer'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EventCheckIn from '../../../../../components/features/events/EventCheckIn'

const EventCheckinPage = () => {
  const params = useParams()
  const searchParams = useSearchParams();
  const eventCode = searchParams.get("eventCode");
  const userEmail = searchParams.get("userEmail");
 
  return (
    <GridContainer>
      {/* @ts-ignore */}
      <EventCheckIn eventCode={eventCode} userEmail={userEmail}  />
    
    </GridContainer>
  )
}

export default EventCheckinPage
