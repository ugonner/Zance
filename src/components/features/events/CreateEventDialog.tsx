'use client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/common/Heading'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import useApi from '@/hooks/useApi'
import { getToken } from '@/store/reducers/authSlice'
import { Event, EventCreationResponse } from '@/types'
import { Box, CircleArrowLeft, SquarePlus } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import EventForm from './EventForm'

const CreateEventDialog = () => {
  const token = useSelector(getToken)

  const { createData, loading: isProcessing } = useApi<Event, EventCreationResponse>()

  const [open, setOpen] = useState(false)

  const { toast } = useToast()

  // A state that will track the form steps - for multi step form.
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const isFirstStep = step === 1
  const isSecondStep = step === 2
  const isThirdStep = step == 3
  const isFourthStep = step == 4

  const onSubmit = async (values: Event) => {
    try {
      if (token) {
        const result = await createData('events', values, token)
        return result
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: `${error}`,
      })
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setStep(1)
        setOpen(current => !current)
      }}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='hidden items-center justify-center gap-2 md:flex'>
          <SquarePlus size={18} strokeWidth={2} className='text-primary' />
          <span className='font-medium'>Create Event</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={e => {
          e.preventDefault()
        }}>
        {!isFirstStep && !isFourthStep && (
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
          ) : isSecondStep ? (
            <DialogTitle className='!text-lg'>Event Details</DialogTitle>
          ) : isThirdStep ? (
            <DialogTitle className='!text-lg'>Event Preview</DialogTitle>
          ) : null}
        </DialogHeader>

        <EventForm step={step} setStep={setStep} onSuccess={onSubmit} isProcessing={isProcessing} />
      </DialogContent>
    </Dialog>
  )
}

export default CreateEventDialog
