import Heading from '@/components/ui/common/Heading'
import { Event } from '@/types/index'
import { format } from 'date-fns'
import { Bookmark, Share } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from 'react'

// TODO: remove this any type from ts
const EventCard = ({ event }: { event: Event }) => {
  const [imageSrc, setImageSrc] = useState<string>('/images/ai-workshop.jpg')

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

  useEffect(() => {
    if (event?.banner && typeof event.banner !== 'string') {
      const reader = new FileReader()
      reader.onload = e => {
        setImageSrc(e.target?.result as string)
      }
      reader.readAsDataURL(event.banner)
    } else if (typeof event?.banner === 'string') {
      setImageSrc(event.banner)
    }
  }, [event?.banner])
  return (
    <Link
      href={`/app/events/${event?._id}`}
      className='group col-span-full overflow-hidden rounded-sm md:col-span-2 lg:col-span-3'>
      <figure className='relative aspect-video overflow-hidden rounded-sm'>
        <Image
          src={imageSrc}
          alt='Event Card'
          layout='fill'
          objectFit='cover'
          loading='lazy'
          className='transition-transform group-hover:scale-105'
        />
      </figure>

      <section className='flex items-start py-2'>
        <div className='flex flex-[4] flex-col justify-center gap-0.5 text-base'>
          <h2 className='text-lg font-medium'>{event?.name}</h2>
          <time className='text-primary'>
            {
              event?.eventDate
                ? format(event.eventDate, 'PPP') // Render eventDate if it exists
                : event?.startDate
                  ? format(event.startDate, 'PPP') // Otherwise, render startDate if eventDate is not present
                  : 'No Date Available' // Fallback if neither eventDate nor startDate are present
            }
          </time>
          {/* <time className='text-primary'>{format(event?.startDate, 'PPP')}</time> */}
          {/* {formatDate(event?.endDate)} */}
          {/* <time className='text-primary'>Tuesday, 10th February</time> */}
          <p className='text-sm text-gray-400'>{event?.location?.address}</p>
          {/* <p className='text-sm text-gray-400'>Itahari, Nepal</p> */}
        </div>
        <div className='flex flex-1 justify-end'>
          <Bookmark
            size={20}
            // fill={false ? "red" : undefined}
            className='text-gray-800'
          />
        </div>
      </section>
    </Link>
  )
}

export default EventCard
