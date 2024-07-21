import Image from 'next/image'
import React from 'react'

import aboutBcg from './../../../../public/about_img.png'

const About = () => {
  return (
    <section id='about' className='h-full'>
      <div className='flex flex-col items-center justify-center px-4 pb-20 pt-16 sm:px-8 md:px-12 lg:px-20 xl:px-48'>
        <h1 className='text-black-400 relative mb-16 text-3xl font-bold max-[450px]:top-[30px] md:text-6xl'>
          About Zance
        </h1>

        <p className='text-black-400 text-center md:text-xl'>
          We help you make your events unforgettable and interactive. Empower your attendees to
          maximise their experience at your event - whether in person, online or hybrid
        </p>
      </div>
      <div>
        <Image src={aboutBcg} alt='Zance about image' />
      </div>
    </section>
  )
}

export default About
