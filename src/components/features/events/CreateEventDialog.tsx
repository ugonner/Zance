'use client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/common/Heading'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import useApi from '@/hooks/useApi'
import { Box, CircleArrowLeft, SquarePlus, Upload } from 'lucide-react'
import React, { useState } from 'react'

import EventForm from './EventForm'

const CreateEventDialog = () => {
  const { createData } = useApi<any, any>()

  // A state that will track the form steps - for multi step form.
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const isFirstStep = step === 1
  const isSecondStep = step === 2
  const isThirdStep = step == 3

  const onSubmit = async (values: any) => {
    const formData = new FormData()

    formData.append('name', values.name)
    formData.append('description', values.description)
    values.tags.forEach((tag: string) => formData.append('tags[]', tag))

    if (values.banner) formData.append('banner', values.banner)
    if (values.brochure) formData.append('brochure', values.brochure)

    formData.append('startDate', values.startDate.toISOString())
    formData.append('endDate', values.endDate.toISOString())
    formData.append('timezone', values.timezone)
    formData.append('location[type]', values.location.type)
    if (values.location.address) formData.append('location[address]', values.location.address)
    if (values.location.meetingLink)
      formData.append('location[meetingLink]', values.location.meetingLink)

    try {
      const result = await createData('events', formData)
      console.log('Event Created Successfully', result)
    } catch (error) {
      console.error('Error creating event', error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' className='hidden items-center justify-center gap-2 md:flex'>
          <SquarePlus size={18} strokeWidth={2} className='text-primary' />
          <span className='font-medium'>Create Event</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        {!isFirstStep && (
          <CircleArrowLeft
            size={28}
            className='cursor-pointer transition-transform hover:scale-105'
            onClick={() => {
              isSecondStep ? setStep(1) : setStep(2)
            }}
          />
        )}
        <DialogHeader className='flex items-center justify-center'>
          {isFirstStep ? (
            <>
              <Box strokeWidth={0.8} size={100} />
              <DialogTitle>
                <Heading type='secondary'>Create new event</Heading>
              </DialogTitle>
            </>
          ) : (
            <DialogTitle className='!text-lg'>Event Details</DialogTitle>
          )}
        </DialogHeader>

        <EventForm step={step} setStep={setStep} onSuccess={onSubmit} />

        <DialogFooter>{/* <Button type="submit">Save changes</Button> */}</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateEventDialog
