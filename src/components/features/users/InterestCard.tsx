import Description from '@/components/ui/common/Description'
import React from 'react'

const InterestCard = ({ interest }: { interest: string }) => {
  return (
    <Description className='rounded-2xl border-2 border-dashed border-gray-200 px-3 py-1 !text-sm capitalize dark:border-gray-800'>
      {interest}
    </Description>
  )
}

export default InterestCard
