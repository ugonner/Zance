import { cn } from '@/lib/utils'
import React from 'react'

const Heading = ({
  children = '',
  type = 'primary',
  className = '',
}: {
  children?: React.ReactNode
  type?: 'primary' | 'secondary' | 'tertiary'
  className?: string
}) => {
  return (
    <h2
      className={cn(
        'font-bold tracking-tight',
        type === 'primary' &&
          'text-4xl leading-[44px] tracking-tighter lg:text-[58px] lg:leading-[64px]',
        type === 'secondary' && 'text-2xl leading-8 lg:text-[32px] lg:leading-10',
        type === 'tertiary' && 'text-xl leading-6 lg:text-2xl lg:leading-8',
        className
      )}>
      {children}
    </h2>
  )
}

export default Heading
