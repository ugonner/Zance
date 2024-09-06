'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import FullPageError from '@/components/ui/common/FullPageError'
import FullPageLoader from '@/components/ui/common/FullPageLoader'
import Heading from '@/components/ui/common/Heading'
import Loader from '@/components/ui/common/Loader'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { timezoneOptions } from '@/consts/DateTime'
import { locationOptions } from '@/consts/Events'
import useApi from '@/hooks/useApi'
import { cn } from '@/lib/utils'
import { getToken } from '@/store/reducers/authSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { BadgeCheck, CalendarDays, Copy, Upload } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import CreatableSelect from 'react-select/creatable'
import { z } from 'zod'

const editEventFormSchema = z
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
        message: 'Description must be at most 1000 characters long',
      }),
    tags: z.array(z.string()).max(5, { message: 'You can enter a maximum of 5 tags' }),
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
    if (data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'End date must be greater than or equal to start date',
        path: ['endDate'],
      })
    }

    if (data.location.type === 'online' && !data.location.meetingLink) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Meeting link is required for online events',
        path: ['location', 'addss'],
      })
    }
  })

const EditEventPage = () => {
  const params = useParams()
  const router = useRouter()
  const token = useSelector(getToken)

  const [isStartDateCalendarOpen, setIsStartDateCalendarOpen] = useState(false)
  const [isEndDateCalendarOpen, setIsEndDateCalendarOpen] = useState(false)

  const { toast } = useToast()

  const {
    fetchData,
    loading,
    error: fetchingError,
    data: eventDetail,
  } = useApi<{ token: string }, any>()

  const { updateData, loading: isUpdatingEvent } = useApi<any, any>()

  useEffect(() => {
    const getEventDetail = async () => {
      try {
        if (token) {
          await fetchData(`events/${params.id}`, token)
        }
        console.log(eventDetail?.data)
      } catch (error) {
        toast({
          variant: 'destructive',
          title: `Something went wrong while fetching profile details! ${error}`,
        })
      }
    }
    getEventDetail()
  }, [fetchData, toast, token])

  const form = useForm<z.infer<typeof editEventFormSchema>>({
    resolver: zodResolver(editEventFormSchema),
    defaultValues: {
      name: '',
      description: '',
      tags: [],
      startDate: new Date(),
      endDate: new Date(),
      timezone: '',
      location: { type: 'online', meetingLink: '', address: '' },
    },
  })

  useEffect(() => {
    if (eventDetail) {
      const event = eventDetail?.data
      form.reset({
        name: event?.name || '',
        description: event?.description || '',
        tags: event?.tags || [],
        startDate: event?.startDate ? new Date(event.startDate) : new Date(),
        endDate: event?.endDate ? new Date(event.endDate) : new Date(),
        timezone: event?.timezone,
        location: event?.location || { type: 'online', meetingLink: '', address: '' },
      })
    }
  }, [eventDetail, form])

  const onSubmit = async (values: z.infer<typeof editEventFormSchema>) => {
    try {
      const editPayload = {
        name: values.name,
        description: values.description,
        tags: values.tags,
        startDate: values.startDate,
        endDate: values.endDate,
        timezone: values.timezone,
        location: values.location,
      }
      if (token) {
        const updateEvent = await updateData(`events/${params.id}`, editPayload, token)
      }
      toast({
        title: `Event Updated Successfully!`,
      })
      router.refresh()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: `${error}`,
      })
    }
  }

  if (loading && !fetchingError) return <FullPageLoader />

  return (
    <section className='mx-auto max-w-3xl'>
      <Heading type='secondary'>Edit Event Details</Heading>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mx-auto flex w-full flex-col justify-center gap-4 py-4 md:gap-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input placeholder='Event name...' {...field} />
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
                    placeholder='Enter up to 5 tags'
                    onChange={selected => field.onChange(selected?.map(item => item?.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='startDate'
            render={({ field }) => (
              <FormItem className='flex flex-1 flex-col'>
                <FormLabel>Start Date</FormLabel>

                <FormControl>
                  <Button
                    onClick={() => setIsStartDateCalendarOpen(!isStartDateCalendarOpen)}
                    variant={'outline'}
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground',
                    )}>
                    {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                    <CalendarDays className='ml-auto h-4 w-4 opacity-50' />
                  </Button>
                </FormControl>

                {isStartDateCalendarOpen && (
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={date => {
                      field.onChange(date)
                      setIsStartDateCalendarOpen(false) // Close the calendar when a date is selected
                    }}
                    disabled={date => new Date() >= date}
                  />
                )}

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
                    onClick={() => setIsEndDateCalendarOpen(!isEndDateCalendarOpen)}
                    variant={'outline'}
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground',
                    )}>
                    {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                    <CalendarDays className='ml-auto h-4 w-4 opacity-50' />
                  </Button>
                </FormControl>

                {isEndDateCalendarOpen && (
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={date => {
                      field.onChange(date)
                      setIsEndDateCalendarOpen(false) // Close the calendar when a date is selected
                    }}
                    disabled={date => new Date() >= date}
                  />
                )}

                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button className='mt-4' type='submit'>
            {isUpdatingEvent ? (
              <span className='flex items-center gap-2'>
                Updating...
                <Loader />
              </span>
            ) : (
              <>Edit Event</>
            )}
          </Button>
        </form>
      </Form>
    </section>
  )
}

export default EditEventPage
