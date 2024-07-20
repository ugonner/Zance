'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import Description from '@/components/ui/common/Description'
import Heading from '@/components/ui/common/Heading'
import Loader from '@/components/ui/common/Loader'
import { DialogClose } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { timezoneOptions } from '@/consts/DateTime'
import { locationOptions } from '@/consts/Events'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { BadgeCheck, CalendarDays, Copy, Upload } from 'lucide-react'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import { z } from 'zod'

import EventDetail from './EventDetail'

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(100, { message: 'Name must be at most 100 characters long' })
      .nonempty('Name is required'),
    description: z
      .string()
      .min(10, { message: 'Description must be at least 10 characters long' })
      .max(1000, {
        message: 'Description must be at most 100 characters long',
      }),
    tags: z
      .array(z.string())
      .min(1, { message: 'At least one tag is required' })
      .nonempty('Tags are required'),
    banner: z
      .any()
      .refine(file => file instanceof File, 'Expected a file')
      .optional(),
    brochure: z
      .any()
      .refine(file => file instanceof File, 'Expected a file')
      .optional(),
    startDate: z.date({ required_error: 'Start date is required' }),
    endDate: z.date({ required_error: 'End date is required' }),
    timezone: z.string().nonempty('Timezone is required'),
    location: z.object({
      type: z.enum(['online', 'physical']),
      meetingLink: z.string().url({ message: 'Meeting link must be a valid URL' }).optional(),
      address: z.string().optional(),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.endDate <= data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'End date must be greater than start date',
        path: ['endDate'],
      })
    }

    if (data.location.type === 'online' && !data.location.meetingLink) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Meeting link is required for online events',
        path: ['location', 'meetingLink'],
      })
    }

    if (data.location.type === 'physical' && !data.location.address) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Address is required for physical events',
        path: ['location', 'address'],
      })
    }
  })

interface EventFormProps {
  step?: 1 | 2 | 3 | 4
  setStep?: Dispatch<SetStateAction<1 | 2 | 3 | 4>>
  onSuccess: (values: z.infer<typeof formSchema>) => Promise<any>
  isProcessing?: boolean
}

const EventForm = ({
  step = 1,
  setStep = () => {},
  onSuccess,
  isProcessing = false,
}: EventFormProps) => {
  const { toast } = useToast()

  const [createdEventCode, setCreatedEventCode] = useState(null)

  // Helpful derived states for reusability
  const isFirstStep = step === 1
  const isSecondStep = step === 2
  const isThirdStep = step == 3
  const isFourthStep = step == 4

  // Refs for file inputs
  const bannerInputRef = useRef(null)
  const brochureInputRef = useRef(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      location: { type: 'online' },
    },
  })

  const handleCopyClick = () => {
    if (!createdEventCode) return

    navigator.clipboard.writeText(createdEventCode).then(
      () => {
        toast({
          title: `Event code copied to clipboard!`,
        })
      },
      err => {
        toast({
          variant: 'destructive',
          title: `Failed to copy text: ${err}`,
        })
      },
    )
  }

  const handleFirstNextClick = async () => {
    const isStepValid = await form.trigger(['name', 'description', 'tags'])

    if (isStepValid) setStep(2)
  }

  // Handlers for custom file input triggers
  const handleBannerClick = () => {
    if (bannerInputRef.current) {
      bannerInputRef.current.click()
    }
  }

  const handleBrochureClick = () => {
    if (brochureInputRef.current) {
      brochureInputRef.current.click()
    }
  }

  const handleSecondNextClick = async () => {
    const isStepValid = await form.trigger([
      'banner',
      'brochure',
      'startDate',
      'endDate',
      'location',
      'location.address',
      'location.meetingLink',
      'location.type',
      'timezone',
    ])

    if (isStepValid) {
      console.log('EVENT VALUES', form.getValues())

      setStep(3)
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await onSuccess(values)

    if (result) {
      setCreatedEventCode(result?.data?.eventCode)
      setStep(4)
    }
  }
  return (
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
                  <FormLabel>Event Tags</FormLabel>
                  <FormControl>
                    <CreatableSelect
                      isMulti
                      value={field?.value?.map(tag => ({
                        label: tag,
                        value: tag,
                      }))}
                      placeholder='Enter upto 5 tags'
                      onChange={selected => field.onChange(selected.map(item => item.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='button' onClick={handleFirstNextClick}>
              Next
            </Button>
          </>
        )}

        {/* Second step form */}
        {isSecondStep && (
          <>
            <div className='flex flex-wrap items-center justify-center gap-4'>
              <FormField
                control={form.control}
                name='banner'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <div
                          onClick={handleBannerClick}
                          className='flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 p-8 text-center text-sm'>
                          <Upload size={20} />
                          {field.value ? field?.value?.name : 'Upload Event Banner'}
                        </div>
                        <input
                          type='file'
                          accept='image/*'
                          className='hidden'
                          ref={bannerInputRef}
                          onChange={e =>
                            e.target.files ? field.onChange(e.target.files[0]) : null
                          }
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='brochure'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <div
                          onClick={handleBrochureClick}
                          className='flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 p-8 text-center text-sm'>
                          <Upload size={20} />
                          {field.value ? field?.value?.name : 'Upload Event Brochure'}
                        </div>
                        <input
                          type='file'
                          accept='.pdf'
                          className='hidden'
                          ref={brochureInputRef}
                          onChange={e =>
                            e.target.files ? field.onChange(e.target.files[0]) : null
                          }
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex w-full flex-wrap items-center gap-4'>
              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem className='flex flex-1 flex-col'>
                    <FormLabel>Start Date</FormLabel>

                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}>
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        <CalendarDays className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>

                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={date => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='endDate'
                render={({ field }) => (
                  <FormItem className='flex flex-1 flex-col'>
                    <FormLabel>End Date</FormLabel>

                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}>
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        <CalendarDays className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>

                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={date => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='timezone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timezone</FormLabel>
                  <FormControl>
                    <CreatableSelect
                      options={timezoneOptions}
                      value={timezoneOptions.find(option => option.value === field.value)}
                      onChange={selectedOption => field.onChange(selectedOption?.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Location</FormLabel>
                  <FormControl>
                    <CreatableSelect
                      options={locationOptions}
                      value={locationOptions?.find(option => option.value === field.value?.type)}
                      onChange={selectedOption => field.onChange({ type: selectedOption?.value })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Conditional rendering based on location type */}
            {form.watch('location.type') === 'physical' && (
              <FormField
                control={form.control}
                name='location.address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Address</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter event address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {form.watch('location.type') === 'online' && (
              <FormField
                control={form.control}
                name='location.meetingLink'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meeting Link</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter meeting link' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* <Button type='submit' onClick={handleSecondNextClick}> */}
            <Button type='button' onClick={handleSecondNextClick}>
              Next
            </Button>
          </>
        )}

        {/* Event Preview */}
        {isThirdStep && (
          <>
            <EventDetail
              event={{
                ...form.getValues(),
                startDate: format(form?.getValues()?.startDate, 'PPP'),
                endDate: format(form?.getValues()?.endDate, 'PPP'),
              }}
            />
            <Button className='mt-4' type='submit'>
              {isProcessing ? (
                <span className='flex items-center gap-2'>
                  Creating
                  <Loader />
                </span>
              ) : (
                <>Create Event</>
              )}
            </Button>
          </>
        )}

        {/* Event Creation Successful UI */}
        {isFourthStep && (
          <div className='flex flex-col items-center justify-center gap-2 text-center'>
            <BadgeCheck size={50} />
            <Heading type='secondary'>Congratulations</Heading>
            <Description>You just created a new event</Description>
            <Separator className='my-2 w-10/12 bg-secondary' />
            <Description>Event Code</Description>
            <Description className='flex items-center gap-2 !text-xl !font-bold'>
              <span>{createdEventCode}</span>
              <Copy
                onClick={handleCopyClick}
                className='cursor-pointer'
                size={20}
                strokeWidth={2.2}
              />
            </Description>
            <DialogClose asChild>
              <Button size='lg' onClick={() => setStep(1)} type='button' className='mt-2'>
                Finish
              </Button>
            </DialogClose>
          </div>
        )}
      </form>
    </Form>
  )
}

export default EventForm
