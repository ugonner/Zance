import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

interface UserAvatarProps {
  height?: number
  width?: number
  image: {
    src: string | null
    alt: string
  }
  fallbackProfile: string
}

const UserAvatar = ({ height = 8, width = 8, image, fallbackProfile }: UserAvatarProps) => {
  return (
    <Avatar className={`h-${height} w-${width}`}>
      {image?.src && <AvatarImage src={image?.src} alt={image?.alt} />}
      <AvatarFallback>{fallbackProfile}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
