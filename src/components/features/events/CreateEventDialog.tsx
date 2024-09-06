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

  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
    })

  const onSubmit = async (values: Event) => {
    console.log('Initial Values:', values)

    // Update values with base64 strings
    try {
      // Convert banner to base64 if it is a File
      if (values.banner instanceof File) {
        values.banner = await convertToBase64(values.banner)
      }

      // Convert brochure to base64 if it is a File
      if (values.brochure instanceof File) {
        values.brochure = await convertToBase64(values.brochure)
      }
    } catch (error) {
      console.error('Error converting files to base64:', error)
    }

    console.log('Updated Values with Base64:', values)

    // Proceed with the form submission
    if (token) {
      try {
        const result = await createData('events', values, token)
        return result
      } catch (error) {
        toast({
          variant: 'destructive',
          title: `${error}`,
        })
      }
    }
    // console.log('Initial Values:', values)

    // // Extract files from values
    // const { banner, brochure } = values

    // try {
    //   // Check if banner is a File and convert it to base64
    //   if (banner instanceof File) {
    //     const base64Banner = await convertToBase64(banner)
    //     console.log('Base64 Banner:', base64Banner)
    //   }

    //   // Check if brochure is a File and convert it to base64
    //   if (brochure instanceof File) {
    //     const base64Brochure = await convertToBase64(brochure)
    //     console.log('Base64 Brochure:', base64Brochure)
    //   }
    // } catch (error) {
    //   console.error('Error converting files to base64:', error)
    // }
    // console.log(values)

    // try {
    //   if (token) {
    //     const result = await createData('events', values, token)
    //     return result
    //   }
    // } catch (error) {
    //   toast({
    //     variant: 'destructive',
    //     title: `${error}`,
    //   })
    // }
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
