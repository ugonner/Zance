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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { DEFAULT_PLACEHOLDER_IMAGE } from '@/consts/Common'
import useApi from '@/hooks/useApi'
import { getLoggedInUser } from '@/store/reducers/authSlice'
import { getToken } from '@/store/reducers/authSlice'
import { Event } from '@/types'
import { getFallbackProfile } from '@/utils/Users'
import { format, isValid } from 'date-fns'
import { CalendarCheck, CalendarDays, Copy, File, Link2, Linkedin, MapPinned } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import UserAvatar from '../users/UserAvatar'

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

  const triggerEventList = () => {}

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

      {isANewEvent ||
        (!isCreator && (
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
        ))}
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
      <AttendeeListSheet
        trigger={
          <Button onClick={triggerEventList} className='max-w-72'>
            <span className='flex items-center gap-2'>View Attendees</span>
          </Button>
        }
        attendees={event?.attendeeProfiles as any[]}
      />
    </section>
  )
}

export default EventDetail

const AttendeeListSheet = ({
  trigger,
  attendees,
}: {
  trigger: React.ReactNode
  attendees: any[]
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const toggleSheet = () => {
    setIsSheetOpen(currentState => !currentState)
  }

  const closeSheet = () => setIsSheetOpen(false)

  return (
    <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader className='mt-8'>
          <SheetTitle className='text-xl font-bold'>Event Attendees</SheetTitle>
        </SheetHeader>
        <Separator />
        <section>
          <div className='flex flex-col gap-4 py-3'>
            {attendees?.length ? (
              attendees?.map((attendee, index) => (
                <div key={index} className='flex items-center justify-between gap-4'>
                  <div className='flex items-center gap-4'>
                    <img
                      src={attendee?.profilePhoto || '/placeholder-image.jpg'}
                      alt={attendee?.fullname || 'Anonymous'}
                      className='h-12 w-12 rounded-full object-cover'
                    />

                    <div className='flex flex-col'>
                      <p className='text-lg font-semibold text-gray-700'>
                        {attendee.fullname || 'Anonymous'}
                      </p>
                      <div className='text-sm text-gray-500'>
                        {attendee?.professionalTitle && (
                          <span>{attendee.professionalTitle || 'No Professional Title'}</span>
                        )}
                        {attendee?.workplace && (
                          <span> / {attendee.workplace || 'No Company Name'}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Profile Button positioned at the extreme right */}
                  <div className='flex'>
                    <PublicProfileSheet
                      userId={attendee?._id}
                      trigger={<Button className='rounded-full px-4 py-2'>Profile</Button>}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No attendees yet</p>
            )}
          </div>
        </section>
      </SheetContent>
    </Sheet>
  )
}

const PublicProfileSheet = ({ userId, trigger }: { userId: string; trigger: React.ReactNode }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [profile, setProfile] = useState(null)
  // const [loading, setLoading] = useState(false)
  const toggleSheet = () => setIsSheetOpen(currentState => !currentState)

  const { fetchData, loading, error, data: profileData } = useApi<any, any>()

  const hasError = error && !profileData && !loading

  useEffect(() => {
    const getPublicProfile = async () => {
      try {
        await fetchData(`user/public-profile/${userId}`)
        console.log(profileData)
      } catch (error) {}
    }
    getPublicProfile()
  }, [fetchData, userId])

  const mappedUser = {
    fullname: profileData?.data?.user?.fullname,
    profilePhoto: profileData?.data?.user?.profilePhoto,
    professionalTitle: profileData?.data?.user?.professionalTitle,
    workplace: profileData?.data?.user?.workplace,
    bio: profileData?.data?.user?.bio,
    linkedIn: profileData?.data?.user?.linkedIn,
  }
  const fallbackProfile = getFallbackProfile(mappedUser.fullname)

  return (
    <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader className='mt-8'>
          <SheetTitle className='text-xl font-bold'>Public Profile</SheetTitle>
        </SheetHeader>
        <Separator className='my-4' />
        {hasError ? (
          <section className='flex h-4/5 flex-col items-center justify-center gap-2'>
            <Description className='text-center !text-base text-red-500'>
              Something went very wrong!
            </Description>
          </section>
        ) : (
          <section>
            <div className='flex flex-col justify-center gap-2'>
              <h2 className='text-lg font-semibold'>Basic Information</h2>
              {loading ? (
                <Skeleton className='h-12 w-10/12' />
              ) : (
                <div className='flex flex-wrap items-center gap-4'>
                  <div className='flex items-center gap-2'>
                    <UserAvatar
                      image={{
                        src: mappedUser?.profilePhoto || null,
                        alt: `Profile Image of User`,
                      }}
                      fallbackProfile={fallbackProfile}
                    />
                    <div className='fex flex-col justify-center'>
                      <p className='text-sm font-semibold'>{mappedUser.fullname || 'Anonymous'}</p>
                    </div>
                  </div>
                  {/* Workplace */}
                  <Separator className='py-4' orientation='vertical' />
                  <div className='flex flex-col justify-center'>
                    <h2 className='text-sm font-semibold'>
                      {mappedUser.professionalTitle || 'Professional Title Not Specified!'}
                    </h2>
                    {mappedUser.workplace && (
                      <h3 className='text-sm text-gray-600 dark:text-gray-400'>
                        {mappedUser.workplace}
                      </h3>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Separator className='my-4' />

            {/* Bio */}
            <div className='flex flex-col justify-center gap-2'>
              <h2 className='text-lg font-semibold'>Bio</h2>
              {!loading && !mappedUser.bio ? (
                <p className='text-sm'>No bio for user!</p>
              ) : (
                <>
                  {loading ? (
                    <Skeleton className='h-10' />
                  ) : (
                    <p className='text-sm'>{mappedUser.bio}</p>
                  )}
                </>
              )}
            </div>

            <Separator className='my-4' />

            {/* Socials */}

            <div className='flex flex-col justify-center gap-2'>
              <h2 className='text-lg font-semibold'>Socials</h2>
              {loading ? (
                <Skeleton className='h-6 w-1/3' />
              ) : mappedUser?.linkedIn ? (
                <Link
                  target='_blank'
                  href={mappedUser?.linkedIn || '#'}
                  className='flex items-center gap-2'>
                  <Linkedin size={18} className='text-primary' />
                  <p className='text-sm font-medium hover:font-semibold'>{mappedUser.fullname}</p>
                </Link>
              ) : (
                <p className='text-sm'>No LinkedIn link specified yet</p>
              )}
            </div>
          </section>
        )}
      </SheetContent>
    </Sheet>
  )
}
