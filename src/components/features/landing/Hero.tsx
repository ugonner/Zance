'use client'

import { motion } from 'framer-motion'
import { HandCoins } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'
import { Button } from 'react-day-picker'
import CreatableSelect from 'react-select/creatable'

import EVENTS from '../../../consts/Events'
import { Event } from '../../../types'

export interface IEventCheckInPageParams {
  eventCode: string
  userEmail: string
}

export const Hero = () => {
  const router = useRouter()
  const [checkInData, setCheckInData] = useState({} as IEventCheckInPageParams)
  const [events, setEvents] = useState([] as Event[])
  const [displaySearchDropDown, setDisplaySearchDropDown] = useState(false)

  const searchEvent = (evt: FormEvent<HTMLInputElement>) => {
    const eventCode = evt.currentTarget.value
    setEvents(
      () => EVENTS.filter(evt => new RegExp(eventCode).test(evt.eventCode)) as unknown as Event[],
    )
  }

  const handleChange = (evt: FormEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget
    setCheckInData({ ...checkInData, [name]: value })
  }

  return (
    <motion.div
      className='container mx-auto h-full px-4 py-10 sm:px-8 md:px-12 lg:px-20 xl:px-48'
      initial={{ y: '-200vh' }}
      animate={{ y: '0%' }}
      transition={{ duration: 1 }}>
      <form className='flex max-w-sm flex-col space-y-2'>
        <input
          className='border-8 border-blue-100 px-6 py-4'
          value={checkInData.eventCode}
          placeholder='Enter Event Code'
          name='eventCode'
          onChange={evt => {
            searchEvent(evt)
            setDisplaySearchDropDown(true)
            handleChange(evt)
          }}
        />
        <div className='relative border-8 px-6 py-4'>
          <input
            className='border-blue-100'
            placeholder='Email'
            name='userEmail'
            onChange={handleChange}
          />

          <Image
            src='/location-enter.svg'
            alt='search button'
            className='absolute bottom-0 right-3 top-4 object-cover'
            width={24}
            height={24}
            role='button'
            onClick={() => {
              router.push(`app/events/${checkInData.eventCode}/checkin`)
            }}
          />
        </div>
        {events?.length && displaySearchDropDown && (
          <div className='relative border-8 px-6 py-4'>
            {events.map(evt => (
              <div
                className='m-2'
                role='button'
                onClick={() => {
                  setDisplaySearchDropDown(false)
                  setCheckInData({ ...checkInData, eventCode: `${evt.eventCode}` })
                }}>
                <small>{evt.name}</small> | <h6>{evt.eventCode || 'NA'}</h6>
              </div>
            ))}
          </div>
        )}
      </form>

      <div className='mx-auto mt-10 flex h-full flex-col items-stretch justify-between gap-8 pb-5 xl:flex-row'>
        {/* TEXT CONTAINER */}
        <div className='flex flex-1 flex-col items-start justify-start gap-8'>
          {/* TITLE */}
          <h1 className='text-3xl font-bold text-black-400 md:text-6xl'>
            Connect,<span className='text-blue-50'>Collaborate,</span>and Elevate!.
          </h1>
          {/* DESC */}
          <p className='text-black-400 md:text-xl'>
            Join our real-time networking platform, your secret weapon to build meaningful
            connections and unlock opportunities.
          </p>
          {/* BUTTON */}
          <div className=''>
            <button className='ring-black rounded-lg bg-blue-50 p-4 text-gray-50 ring-1'>
              Get Started
            </button>
          </div>
        </div>
        {/* IMAGE CONTAINER */}
        <div className='relative aspect-[2/2] w-full flex-1'>
          <Image src='/zance-hero.png' alt='Zance hero image' fill objectFit='contain' />
        </div>
      </div>
    </motion.div>
  )
}

export default Hero
