import Heading from '@/components/ui/common/Heading'
import { Event } from '@/types/index'
import { format } from 'date-fns'
import { Bookmark, Share } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// TODO: remove this any type from ts
const EventCard = ({ event }: { event: Event }) => {
  return (
    <Link
      href={`/app/events/${event?._id}`}
      className='group col-span-full overflow-hidden rounded-sm md:col-span-2 lg:col-span-3'>
      <figure className='relative aspect-video overflow-hidden rounded-sm'>
        <Image
          src={event?.banner ? event?.banner : '/images/ai-workshop.jpg'}
          alt='Event Card'
          layout='fill'
          objectFit='cover'
          loading='lazy'
          className='transition-transform group-hover:scale-105'
        />
      </figure>

      <section className='flex items-start py-2'>
        <div className='flex flex-[4] flex-col justify-center gap-0.5 text-base'>
          <h2 className='text-lg font-medium'>{event.name}</h2>
          {/* <time className='text-primary'>{format(event?.date, 'PPP')}</time> */}
          <time className='text-primary'>Tuesday, 10th February</time>
          {/* <p className='text-sm text-gray-400'>{event.location}</p> */}
          <p className='text-sm text-gray-400'>Itahari, Nepal</p>
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
