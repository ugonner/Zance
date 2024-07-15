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
import { Box, CircleArrowLeft, SquarePlus, Upload } from 'lucide-react'
import React, { useState } from 'react'

import EventForm from './EventForm'

const CreateEventDialog = () => {
  // A state that will track the form steps - for multi step form.
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const isFirstStep = step === 1
  const isSecondStep = step === 2
  const isThirdStep = step == 3

  // const onSubmit = (values: z.infer<typeof formSchema>) => {
  //   console.log('Event Form Values', values)
  //   //   setStep(1);
  //   //   form.reset();
  // }

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

        <EventForm step={step} setStep={setStep} />

        <DialogFooter>{/* <Button type="submit">Save changes</Button> */}</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateEventDialog
