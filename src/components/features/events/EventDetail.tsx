'use client'

import TagCard from '@/components/features/events/TagCard'
import AvatarStack from '@/components/features/users/AvatarStack'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Description from '@/components/ui/common/Description'
import Heading from '@/components/ui/common/Heading'
import Loader from '@/components/ui/common/Loader'
import ReadText from '@/components/ui/common/ReadText'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { DEFAULT_PLACEHOLDER_IMAGE } from '@/consts/Common'
import useApi from '@/hooks/useApi'
import { getLoggedInUser } from '@/store/reducers/authSlice'
import { getToken } from '@/store/reducers/authSlice'
import { Event } from '@/types'
import { format, isValid } from 'date-fns'
import { CalendarCheck, CalendarDays, Copy, File, Link2, MapPinned } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

// Here isANewEvent is a boolean value to determine whether the event is new or not so that we can hide some of the fields while event creation that aren't available
const EventDetail = ({ event, isANewEvent = false }: { event: Event; isANewEvent?: boolean }) => {
  const isAddressPhysical = event?.location?.type === 'physical'
  const user = useSelector(getLoggedInUser)
  const loggedInUserId = user?._id // Adjust this depending on how your token stores the user info
  const router = useRouter()
  const token = useSelector(getToken)
  const {
    createData,
    loading: isRegistering,
    deleteData,
    loading: isDeletingData,
  } = useApi<any, any>()

  // Check if the logged-in user is the event creator
  const isCreator = event?.creator === loggedInUserId
  const isAlreadyRegistered = event?.attendeeIds?.some(
    attendeeId => attendeeId.toString() === loggedInUserId?.toString(),
  )
  // Function to format the date using JavaScript's Date methods
  const formatDate = (date: string | Date | undefined) => {
    if (!date) return 'Invalid date'

    // Ensure the date is a Date object
    const validDate = typeof date === 'string' ? new Date(date) : date

    if (isNaN(validDate.getTime())) return 'Invalid date'

    // Convert the date to a string format like "September 9, 2024"
    return validDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const handleDelete = async () => {
    try {
      if (token) {
        const deleteEvent = await deleteData(`events/${event?._id}`, token)
      }
      toast({ title: 'Event Deleted!' })
      router.back()
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: `${error}`,
      })
    }
  }

  const handleRegisterForEvent = async () => {
    try {
      if (token) {
        const registerForEvent = await createData(`events/register/${event?._id}`, {}, token)
      }
      toast({ title: 'Registration Successful', variant: 'default' })
      router.back()
    } catch (error) {
      console.log(error)
      toast({ variant: 'destructive', title: `${error}` })
    }
  }
  return (
    <section className='col-span-full flex w-full flex-col justify-center gap-4 md:gap-8'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:gap-0'>
        {/* Event name, time & location */}
        <div className='flex flex-col items-start gap-2 md:flex-1'>
          <Heading type='secondary'>{event?.name}</Heading>{' '}
          {isAlreadyRegistered && <Badge variant='secondary'>Registered</Badge>}
          <div className='flex flex-col items-start gap-2'>
            <time className='flex items-center justify-center gap-2'>
              <CalendarDays className='text-white dark:text-background' fill='#B7B7BB' size={28} />
              <Description>
                <strong>Start: </strong>
                {
                  event?.eventDate
                    ? `${formatDate(event.eventDate)} ${event?.startTime ? `at ${event.startTime}` : ''}` // Render eventDate and startTime if available
                    : event?.startDate
                      ? `${formatDate(event.startDate)} ${event?.startTime ? `at ${event.startTime}` : ''}` // Fallback to startDate and startTime if eventDate is not present
                      : 'No Start Date Available' // Fallback message
                }
              </Description>
            </time>

            {/* End Date and Time */}
            <time className='flex items-center justify-center gap-2'>
              <CalendarCheck className='text-white dark:text-background' fill='#B7B7BB' size={28} />
              <Description>
                <strong>End: </strong>
                {
                  event?.eventDate
                    ? `${formatDate(event.eventDate)} ${event?.endTime ? `at ${event.endTime}` : ''}` // Render eventDate and endTime if available
                    : event?.endDate
                      ? `${formatDate(event.endDate)} ${event?.endTime ? `at ${event.endTime}` : ''}` // Fallback to endDate and endTime if eventDate is not present
                      : 'No End Date Available' // Fallback message
                }
              </Description>
            </time>
            {/* <time className='flex items-center justify-center gap-2'>
              <CalendarDays className='text-white dark:text-background' fill='#B7B7BB' size={28} />
              <Description>
                <strong>Start:</strong> {format(event?.startDate, 'PPP')}
                <strong>Start: </strong>
                {formatDate(event?.startDate)}
              </Description>
            </time>

            <time className='flex items-center justify-center gap-2'>
              <CalendarCheck className='text-white dark:text-background' fill='#B7B7BB' size={28} />
              <Description>
                <strong>End:</strong> {format(event?.endDate, 'PPP')}
                <strong>End: </strong>
                {formatDate(event?.endDate)}
              </Description>
            </time> */}

            <span className='flex items-center justify-center gap-2'>
              {isAddressPhysical ? (
                <>
                  <MapPinned className='text-white dark:text-background' fill='#B7B7BB' size={28} />
                  <Description>{event?.location?.address}</Description>
                  <Description>{event?.location?.postcode}</Description>
                </>
              ) : (
                <>
                  <Link2 className='text-white dark:text-background' fill='#B7B7BB' size={28} />
                  <Link
                    className='flex-1 text-primary'
                    target='_blank'
                    href={event?.location?.meetingLink || '#'}>
                    {event?.location?.meetingLink || 'Meeting Link'}
                  </Link>
                </>
              )}
            </span>
          </div>
        </div>

        {/* Event Image */}
        <div className='relative aspect-video flex-1 overflow-hidden rounded-sm md:flex-[.6]'>
          <Image
            src={event?.banner ? `${event.banner}` : DEFAULT_PLACEHOLDER_IMAGE}
            fill
            objectFit='cover'
            alt={`Image for event ${event?.name}`}
          />
        </div>
      </div>
      <Separator className='bg-secondary' />

      {/* Description & Tags */}
      <div className='flex flex-col items-start gap-4'>
        {event?.description && (
          <div className='flex flex-col gap-2'>
            <Heading type='tertiary'>Event Description</Heading>
            <Description className='text-justify'>
              <ReadText value={event?.description} />
            </Description>
          </div>
        )}

        <div className='flex flex-col gap-2'>
          <Heading type='tertiary'>Event Tags</Heading>

          <div className='flex flex-wrap items-center gap-2'>
            {event?.tags?.map(tag => <TagCard key={tag} tag={tag} />)}
          </div>
        </div>
      </div>

      <Separator className='bg-secondary' />

      <div className='flex flex-col items-start gap-4'>
        <div className='flex flex-col gap-2'>
          <Heading type='tertiary'>Event Brochure</Heading>
          <Description className='flex items-center gap-2'>
            <File className='cursor-pointer' size={20} />
            {event?.brochure ? (
              <Link
                href={event?.brochure.toString()}
                target='_blank'
                className='flex items-center rounded-lg bg-[#FFF8EB] p-3 text-sm font-medium'>
                Event Brochure
              </Link>
            ) : (
              <span>Brochure Here</span>
            )}
          </Description>
        </div>

        {/* Isaac's Version (Please edit if you have a better way) */}
        <>
          <div className='flex flex-col gap-2'>
            <Heading type='tertiary'>Event Attendees </Heading>
            {(event?.attendeeCount as number) > 0 ? (
              <div>
                <div className='flex items-center gap-2'>
                  <AvatarStack
                    size={10}
                    images={event
                      ?.attendeeProfiles!.filter(profile => profile.profilePhoto)
                      .map(profile => ({
                        src: profile.profilePhoto.toString(),
                        alt: profile.fullname || 'Unknown User',
                      }))}
                  />
                  <p className='text-sm text-gray-500 dark:text-gray-200'>
                    {event?.attendeeCount?.toString()} Registered
                  </p>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </>

        {isANewEvent || (
          <>
            {/* <div className='flex flex-col gap-2'>
              <Heading type='tertiary'>Event Code</Heading>
              <Description className='flex items-center gap-2'>
                <span>{event?.eventCode}</span> <Copy className='cursor-pointer' size={20} />
              </Description>
            </div> */}

            <div className='flex flex-col gap-2'>
              {/* <Heading type='tertiary'>Event Attendees</Heading> */}

              {/* {(event?.attendees?.length as number) > 0 ? (
                <div>
                  <div className='flex items-center gap-2'>
                    <AvatarStack
                      size={10}
                      images={[
                        {
                          src: 'https://github.com/torvalds.png',
                          alt: 'User 1',
                        },
                        {
                          src: 'https://github.com/johnpapa.png',
                          alt: 'User 2',
                        },
                        {
                          src: 'https://github.com/jessfraz.png',
                          alt: 'User 3',
                        },
                      ]}
                    />
                    <p className='text-sm text-gray-400 dark:text-gray-200'>
                      {event?.attendees?.length} Registered 24 Registered
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className='text-sm text-gray-400 dark:text-gray-200'>
                    {event?.attendees?.length} Registered 24 Registered
                  </p>
                </div>
              )} */}

              {/* <div className='flex items-center gap-2'>
                <AvatarStack
                  size={10}
                  images={[
                    {
                      src: 'https://github.com/torvalds.png',
                      alt: 'User 1',
                    },
                    {
                      src: 'https://github.com/johnpapa.png',
                      alt: 'User 2',
                    },
                    {
                      src: 'https://github.com/jessfraz.png',
                      alt: 'User 3',
                    },
                  ]}
                />
                <p className='text-sm text-gray-400 dark:text-gray-200'>
                  {event?.attendees?.length} Registered 24 Registered
                </p>
              </div> */}
            </div>
          </>
        )}
      </div>

      {isANewEvent || (
        <Button
          onClick={handleRegisterForEvent}
          className='max-w-72'
          disabled={isAlreadyRegistered}>
          {isRegistering ? (
            <span className='flex items-center gap-2'>
              Registering... <Loader />
            </span>
          ) : (
            <>Register for this event</>
          )}
        </Button>
      )}
      {isCreator && (
        <Button className='max-w-72'>
          <Link href={`/app/events/${event?._id}/edit`}>Edit Event</Link>
        </Button>
      )}
      {isCreator && (
        <>
          <Button variant='destructive' className='max-w-72' onClick={handleDelete}>
            {isDeletingData ? (
              <span className='flex items-center gap-2'>
                Deleting...
                <Loader />
              </span>
            ) : (
              <>Delete Event</>
            )}
          </Button>
        </>
      )}
    </section>
  )
}

export default EventDetail
