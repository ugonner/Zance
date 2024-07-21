import ROUTES from '@/consts/Routes'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <Link href={ROUTES.HOME} className={cn('flex cursor-pointer items-center gap-2', className)}>
      <Image src='/logo.svg' height={32} width={32} alt='Zance Logo' />
      <h3 className='text-xl font-extrabold leading-8 tracking-tighter lg:text-2xl'>Zance</h3>
    </Link>
  )
}

export default Logo
