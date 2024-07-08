'use client'

import ROUTES from '@/consts/Routes'
import { TriangleAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { Button } from '../button'

interface FullPageErrorProps {
  title?: string
  description?: string
}

const FullPageError = ({
  title = 'Oops! Something went wrong',
  description = "Couldn't find the page you were looking for.",
}: FullPageErrorProps) => {
  const router = useRouter()

  const handleGoHome = () => {
    router.push(ROUTES.HOME)
  }

  return (
    <div className='flex min-h-[70dvh] flex-col items-center justify-center'>
      <div className='max-w-xl p-8 text-center'>
        <div className='flex flex-col items-center'>
          <TriangleAlert size={40} className='text-red-500' />
          <h1 className='mt-4 text-3xl font-bold'>{title}</h1>
          <p className='mt-2 text-gray-600 dark:text-gray-400'>{description}</p>
          <Button className='mt-6' onClick={handleGoHome}>
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FullPageError
