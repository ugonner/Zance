import Image from 'next/image'
import React from 'react'

import benefitBcg from './../../../../public/about_image.png'
import contantImg from './../../../../public/contact_svg.svg'
import fingerprint from './../../../../public/fingerPrint.svg'
import list from './../../../../public/list_svg.svg'

// benefit details
const benefitDetails = [
  {
    title: 'Showcase Your Brand',
    text: 'Standout by showcasing your brand, products and services easily as an organiser or attendee.',
    benefitImg: contantImg,
  },
  {
    title: 'Expand Your Network Effortlessly',
    text: 'Get access to the profiles of attendees at your event, connect and grow your network',
    benefitImg: list,
  },
  {
    title: 'Enhance Event Visibility and Engagement',
    text: 'Make your event details visible so attendees can easily follow and engage with you, your brand and your sponsors',
    benefitImg: fingerprint,
  },
]

const Benefits = () => {
  return (
    <section className='h-full w-full'>
      <div className='px-4 py-16 sm:px-8 md:px-12 lg:px-20 xl:px-48'>
        <h4 className='text-black-400 text-left text-2xl font-bold md:text-5xl'>
          What we are doing
        </h4>
        <div className='mt-16 flex flex-col items-start justify-between gap-5 md:flex-row lg:flex-row'>
          <div>
            <div className='lg:max-w-full'>
              {benefitDetails.map(benefit => (
                <div
                  key={benefit.title}
                  className='flex flex-row items-start justify-start gap-8 pb-10'>
                  <div className='flex flex-row items-center justify-center rounded-full bg-blue-50 px-4 py-4'>
                    <div className='h-10 w-10'>
                      <Image src={benefit.benefitImg} alt={benefit.title} />
                    </div>
                  </div>
                  <div className='flex flex-col justify-start gap-2'>
                    <h5 className='text-black-400 text-xl font-bold lg:text-2xl'>
                      {benefit.title}
                    </h5>
                    <p className='text-black-400 text-xs md:text-xl'>{benefit.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className='relative mx-auto w-full md:w-full lg:w-9/12'>
              <Image src={benefitBcg} alt='Zance benefit' className='' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benefits
