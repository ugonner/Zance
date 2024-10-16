'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import Description from '@/components/ui/common/Description'
import Heading from '@/components/ui/common/Heading'
import Loader from '@/components/ui/common/Loader'
import RichEditor from '@/components/ui/common/RichTextEditor'
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
import useApi from '@/hooks/useApi'
import { cn } from '@/lib/utils'
import { fetchTags, getTagList } from '@/store/reducers/eventSlice'
import { AppDispatch } from '@/store/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { BadgeCheck, CalendarDays, Copy, Upload } from 'lucide-react'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
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
      .max(5, { message: 'You can only select/add 5 tags' })
      .nonempty('Tags are required'),
    banner: z
      .any()
      .refine(file => file instanceof File, 'Expected a file')
      .optional(),
    brochure: z
      .any()
      .refine(file => file instanceof File, 'Expected a file')
      .optional(),
    // banner: z.string().optional(), // Expect a base64 string
    // brochure: z.string().optional(), // Expect a base64 string
    // startDate: z.date({ required_error: 'Start date is required' }),
    // endDate: z.date({ required_error: 'End date is required' }),
    eventDate: z.date({ required_error: 'Event date is required' }),
    startTime: z
      .string()
      .nonempty('Start Time is required')
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Start Time must be in HH:mm format' }), // Time format validation
    endTime: z
      .string()
      .nonempty('End Time is required')
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'End Time must be in HH:mm format' }), // Time format validation

    timezone: z.string().nonempty('Timezone is required'),
    location: z.object({
      type: z.enum(['online', 'physical']),
      meetingLink: z.string().url({ message: 'Meeting link must be a valid URL' }).optional(),
      address: z.string().optional(),
      postcode: z.string().optional(),
    }),
  })
  .superRefine((data, ctx) => {
    // convert start time and endtime to date objects for comparison
    const [startHour, startMinute] = data.startTime.split(':').map(Number)
    const [endHour, endMinute] = data.endTime.split(':').map(Number)

    const startDate = new Date(1970, 0, 1, startHour, startMinute)
    const endDate = new Date(1970, 0, 1, endHour, endMinute)

    // check if endTime is before or equal to startTime
    if (endDate <= startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'End time must be after start time',
        path: ['endTime'],
      })
    }
    // if (data.endDate < data.startDate) {
    //   ctx.addIssue({
    //     code: z.ZodIssueCode.custom,
    //     message: 'End date must be greater than or equal to start date',
    //     path: ['endDate'],
    //   })
    // }

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

    if (data.location.type === 'physical' && !data.location.postcode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please add postcode for physical events',
        path: ['location', 'postcode'],
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

  const dispatch = useDispatch<AppDispatch>()
  const tagList = useSelector(getTagList)

  useEffect(() => {
    if (!tagList?.length) {
      dispatch(fetchTags())
      console.log(`Tag list.... ${tagList}`)
    }
  }, [dispatch, tagList])

  // Helpful derived states for reusability
  const isFirstStep = step === 1
  const isSecondStep = step === 2
  const isThirdStep = step == 3
  const isFourthStep = step == 4

  // Refs for file inputs
  const bannerInputRef = useRef<HTMLInputElement>(null)
  const brochureInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      tags: [],
      // startDate: new Date(),
      // endDate: new Date(),
      eventDate: new Date(),
      startTime: '',
      endTime: '',
      timezone: '',
      location: { type: 'online', meetingLink: '', address: '', postcode: '' },
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
  // For banner
  const handleBannerClick = () => {
    if (bannerInputRef.current) {
      bannerInputRef.current.click()
    }
  }

  // For brochure
  const handleBrochureClick = () => {
    if (brochureInputRef.current) {
      brochureInputRef.current.click()
    }
  }

  // Handle the file change and set both the File and Base64 values

  const handleSecondNextClick = async () => {
    const isStepValid = await form.trigger([
      'banner',
      'brochure',
      'eventDate',
      'startTime',
      'endTime',
      // 'startDate',
      // 'endDate',
      'location',
      'location.address',
      'location.meetingLink',
      'location.type',
      'location.postcode',
      'timezone',
    ])

    if (isStepValid) {
      setStep(3)
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await onSuccess(values)

    if (result) {
      form.reset()
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
                    {/* <Textarea
                      rows={5}
                      placeholder='Enter event description (Max. 1000 characters)'
                      {...field}
                    /> */}
                    <RichEditor
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
                      // options={tagList?.map(tag => ({ label: tag, value: tag }))}
                      // placeholder='Enter upto 5 tags'
                      // // onChange={selected => field.onChange(selected?.map(item => item?.value))}
                      // onChange={selected => {
                      //   const selectedTags = selected?.map(item => item.value)
                      //   if (selectedTags.length <= 5) {
                      //     field.onChange(selectedTags)
                      //   }
                      // }}
                      options={
                        Array.isArray(tagList)
                          ? tagList.map(tag => ({ label: tag, value: tag }))
                          : []
                      } // Check if tagList is an array
                      placeholder='Enter up to 5 tags'
                      onChange={selected => {
                        const selectedTags = selected?.map(item => item?.value)
                        if (selectedTags.length <= 5) {
                          field.onChange(selectedTags)
                        }
                      }}
                      isClearable
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
                          // onChange={e => {
                          //   // Show the selected file in the input
                          //   field.onChange(e.target.files?.[0]) // This will reflect the file chosen

                          //   // Call the handler to convert to base64 and set in form
                          //   handleFileChange(e, field)
                          // }}
                          onChange={e =>
                            e.target.files ? field.onChange(e.target.files[0]) : null
                          }
                          // onChange={handleBannerChange}
                          // onChange={e => handleFileChange(e, field)}
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
                          // onChange={e => {
                          //   // Show the selected file in the input
                          //   field.onChange(e.target.files?.[0]) // This will reflect the file chosen

                          //   // Call the handler to convert to base64 and set in form
                          //   handleFileChange(e, field)
                          // }}
                          onChange={e =>
                            e.target.files ? field.onChange(e.target.files[0]) : null
                          }
                          // onChange={handleBrochureChange}
                          // onChange={e => handleFileChange(e, field)}
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex w-full flex-wrap items-center gap-4'>
              {/* Event Date Input */}
              <FormField
                control={form.control}
                name='eventDate'
                render={({ field }) => (
                  <FormItem className='flex flex-1 flex-col'>
                    <FormLabel>Event Date</FormLabel>

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
                      disabled={date => new Date() >= date} // Disable past dates
                      initialFocus
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Start Time Input */}
              <FormField
                control={form.control}
                name='startTime'
                render={({ field }) => (
                  <FormItem className='flex flex-1 flex-col'>
                    <FormLabel>Start Time</FormLabel>

                    <FormControl>
                      <input
                        type='time'
                        className='input-field w-full'
                        value={field.value || ''}
                        onChange={field.onChange}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Time Input */}
              <FormField
                control={form.control}
                name='endTime'
                render={({ field }) => (
                  <FormItem className='flex flex-1 flex-col'>
                    <FormLabel>End Time</FormLabel>

                    <FormControl>
                      <input
                        type='time'
                        className='input-field w-full'
                        value={field.value || ''}
                        onChange={field.onChange}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <div className='flex w-full flex-wrap items-center gap-4'>
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
                      disabled={date => new Date() >= date}
                      initialFocus
                    />

                    <FormMessage />
                  </FormItem>
                )}
              /> */}

            {/* <FormField
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
                      disabled={date => new Date() >= date}
                      initialFocus
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}

            <FormField
              control={form.control}
              name='timezone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timezone</FormLabel>
                  <FormControl>
                    <CreatableSelect
                      options={timezoneOptions}
                      value={timezoneOptions?.find(option => option.value === field.value)}
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

            {form.watch('location.type') === 'physical' && (
              <FormField
                control={form.control}
                name='location.postcode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Postcode</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter event postcode' {...field} />
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
              }}
              isANewEvent={true}
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
