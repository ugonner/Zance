import Image from 'next/image'
import React from 'react'

import benefitBcg from './../../../../public/benefit_img.png'

const Founder = () => {
  const hideOnLargeStyles = `
  @media (min-width: 450px) {
    .hide-on-large {
      display: none;
    }
  }
`
  return (
    <section className='relative flex h-[650px] w-full flex-wrap lg:h-screen'>
      <div className='bg-black-50 md:pt-18 flex h-1/2 w-full flex-col items-start justify-between px-4 pt-10 text-gray-50 sm:px-8 md:flex-row md:px-12 lg:flex-row lg:px-20 lg:pt-20 xl:px-48'>
        <div>
          <h4 className='text-3.5xl mb-3 text-left font-bold md:text-4xl'>From the Founder</h4>
          <p className='mb-3 text-left md:text-xl'>Ifeanyi Ukwu</p>
          <p className='mb-3 text-left md:text-xl'>Chief Executive Officer</p>
        </div>
      </div>
      <div className='absolute right-0 top-[40px] max-[450px]:top-[160px] max-[450px]:m-[4vw] max-[450px]:h-[350px] max-[450px]:w-[90vw] md:mr-[1vw] md:h-[400px] md:w-[400px] lg:mr-[2vw] lg:h-[90vh] lg:w-[40vw]'>
        <Image
          src={benefitBcg}
          className='h-full w-full rounded-lg object-cover'
          alt='Zance benefit'
        />
      </div>
    </section>
  )
}

export default Founder
