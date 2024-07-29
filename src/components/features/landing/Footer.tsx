import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import facebook from './../../../../public/facebook.svg'
import linkedln from './../../../../public/linkedin.svg'
import whiteLogo from './../../../../public/white_logo.svg'

const Footer = () => {
  return (
    <footer>
      <div className='bg-lightBlue-400 flex flex-col items-center justify-between gap-2 px-4 py-10 text-gray-50 sm:flex-row sm:px-8 md:px-12 lg:px-20 xl:px-48'>
        <div className='md:hidden lg:flex xl:justify-center'>
          <Link href='/' className='flex items-start justify-center p-1 font-semibold'>
            <Image src={whiteLogo} alt='Zance logo' />
            <span className='ml-3 text-2xl md:text-4xl'>Zance</span>
          </Link>
        </div>
        <div className='flex flex-col items-center justify-between gap-4 lg:flex-row'>
          <p className='text-xs md:text-xl'>Phone: +44-889 99 00</p>
          <p className='text-xs md:text-xl'>Email: Zance@example.com</p>
        </div>
        <div className='flex flex-row items-center justify-between gap-4'>
          <Image src={facebook} alt='zance facebook' />
          <Image src={linkedln} alt='zance linkedln' />
        </div>
      </div>
    </footer>
  )
}

export default Footer
