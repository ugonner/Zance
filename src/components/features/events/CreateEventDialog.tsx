'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Heading from '@/components/ui/common/Heading'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { FormType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, SquarePlus } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const CreateEventDialog = () => {
  // A state that will track the form steps - for multi step form.
  const [step, setStep] = useState<1 | 2 | 3>(1)

  // Helpful derived states for reusability
  const isFirstStep = step === 1
  const isSecondStep = step === 2
  const isThirdStep = step == 3

  const formSchema = z.object({
    name: z.string().min(2, { message: 'Event name must be at least 2 characters long' }).max(100, {
      message: 'Event name must be at most 100 characters long',
    }),
    description: z
      .string()
      .min(10, { message: 'Description must be at least 10 characters long' })
      .max(1000, {
        message: 'Description must be at most 100 characters long',
      }),
    tags: z
      .string()
      .min(2, { message: 'Tags must be at least 2 characters long' })
      .max(100, { message: 'Tags must be at most 100 characters long' })
      .optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const handleNextClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const isStepValid = await form.trigger(['name', 'description', 'tags'])
    if (isStepValid) setStep(2)
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    //   console.log("Registration Form Values", values);
    //   setStep(1);
    //   form.reset();
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
        <DialogHeader className='flex items-center justify-center'>
          <Box strokeWidth={0.8} size={100} />
          <DialogTitle>
            <Heading type='secondary'>Create new event</Heading>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='mx-auto flex w-full flex-col justify-center gap-4 py-4 md:gap-6'>
            {/* Inputs in first step form */}
            {isFirstStep && (
              <>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter event Name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          placeholder='Enter event description (Max. 1000 characters)'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='tags'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Description</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter up to 5 tags' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button>Next</Button>
              </>
            )}
          </form>
        </Form>

        <DialogFooter>{/* <Button type="submit">Save changes</Button> */}</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateEventDialog
