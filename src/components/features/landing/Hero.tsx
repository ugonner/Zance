'use client'

import { motion } from 'framer-motion'
import { HandCoins } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'
import { Button } from 'react-day-picker'
import CreatableSelect from 'react-select/creatable'

export const Hero = () => {
  
  return (
    <motion.div
      className='container mx-auto h-full px-4 py-10 sm:px-8 md:px-12 lg:px-20 xl:px-48'
      initial={{ y: '-200vh' }}
      animate={{ y: '0%' }}
      transition={{ duration: 1 }}>
      

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
