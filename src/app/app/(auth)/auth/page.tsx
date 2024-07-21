'use client'

import EmailRegistrationDialog from '@/components/features/auth/EmailRegistrationDialog'
import LoginDialog from '@/components/features/auth/LoginDialog'
import { Button } from '@/components/ui/button'
import Description from '@/components/ui/common/Description'
import Heading from '@/components/ui/common/Heading'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { FormType } from '@/types'
import React, { useState } from 'react'

const AuthPage = () => {
  const { toast } = useToast()

  const [openForm, setOpenForm] = useState<FormType>(null)

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <Heading className='text-center'>Set up your account</Heading>

      <Description className='text-center'>
        Create events, manage attendee lists and expand your horizon
      </Description>

      <div className='my-4 flex flex-wrap items-center gap-4'>
        <Button
          size='lg'
          className='flex-1'
          onClick={() => {
            toast({
              variant: 'destructive',
              title: 'Coming soon!',
              description: 'Registering with LinkedIn will be available soon. Stay tuned!',
            })
          }}>
          Register with LinkedIn
        </Button>
        <Button
          size='lg'
          className='flex-1'
          variant='secondary'
          onClick={() => setOpenForm('emailRegistration')}>
          Register with Email
        </Button>
      </div>

      <Separator />

      <Description className='text-gray-600 dark:text-gray-400'>
        Already have an account?
      </Description>

      <Button variant='link' onClick={() => setOpenForm('login')} className='-mt-4'>
        Login with Email
      </Button>

      <LoginDialog isOpen={openForm === 'login'} setOpenForm={setOpenForm} />

      <EmailRegistrationDialog
        isOpen={openForm === 'emailRegistration'}
        setOpenForm={setOpenForm}
      />
    </div>
  )
}

export default AuthPage
