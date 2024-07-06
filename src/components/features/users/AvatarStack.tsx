import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import React from 'react'

const AvatarStack = ({
  images,
  size = 12,
}: {
  images: { src: string; alt: string }[]
  size?: number
}) => {
  return (
    <div className='flex -space-x-3'>
      {images.map(image => (
        <Avatar
          key={image.src}
          className={cn('border-2 border-gray-400 dark:border-gray-200', `w-${size} h-${size}`)}>
          <AvatarImage src={image.src} alt={image.alt} />
        </Avatar>
      ))}
    </div>
  )
}

export default AvatarStack
