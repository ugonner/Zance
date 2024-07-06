'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import useApi from '@/hooks/useApi'
import { cn } from '@/lib/utils'
import { getLoggedInUser, setUser } from '@/store/reducers/authSlice'
import {
  EmailRegistrationFormData,
  EmailRegistrationResponse,
  FormType,
  ProfileFormData,
  ProfileResponse,
  profileData,
} from '@/types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '../../ui/button'
import EmailRegistrationForm from './EmailRegistrationForm'
import ProfileForm from './ProfileForm'

const EmailRegistrationDialog = ({
  isOpen,
  setOpenForm,
}: {
  isOpen: boolean
  setOpenForm: (formName: FormType) => void
}) => {
  const dispatch = useDispatch()

  const { toast } = useToast()

  const { createData, loading: isRegistering } = useApi<
    EmailRegistrationFormData,
    EmailRegistrationResponse
  >()

  const { updateData, loading: isCreatingProfile } = useApi<profileData, ProfileResponse>()

  // A state that will track the form steps - for multi step form.
  const [step, setStep] = useState<1 | 2>(1)

  // Helpful derived states for reusability
  const isFirstStep = step === 1

  const loggedInUser = useSelector(getLoggedInUser)
  console.log('LOGGED IN USER ', loggedInUser)

  // A handler that will be executed when a user clicks login with email in the bottom section of the form
  const handleOpenLoginForm = () => {
    // registrationForm.reset();
    setOpenForm('login')
  }

  const onRegistrationSubmit = async (values: EmailRegistrationFormData) => {
    try {
      const registrationData: EmailRegistrationFormData = {
        email: values.email,
        password: values.password,
      }
      const response = await createData('auth/register', registrationData)

      console.log('RESPONSE USER ', response?.user)

      dispatch(setUser({ user: response?.user, token: '' }))

      toast({
        title: `${response.message}! Now Please take a time to setup your profile!`,
      })

      setStep(2)
    } catch (err) {
      toast({
        variant: 'destructive',
        title: `${err}`,
      })
    }
  }

  const onProfileSubmit = async (values: ProfileFormData) => {
    try {
      const profileDataPayload = {
        profile: {
          fullname: values.fullName,
          professionalTitle: values.professionalTitle,
          workPlace: values.workPlace,
          location: values.location,
          bio: values.bio,
          interests: values.interests,
          socialLinks: {
            linkedIn: values.linkedInLink,
          },
          contactDetails: {
            phone: values.phoneNumber,
          },
        },
      }

      const response = await updateData('user/profile', profileDataPayload)

      const userData = response?.data

      // Unsolved mystery until api works
      // dispatch(setUser({ user: userData, token: '' }));

      toast({
        title: `Profile Created Successfully! You can now login to your account!`,
      })

      setOpenForm(null)
      setStep(1)
    } catch (err) {
      toast({
        variant: 'destructive',
        title: `${err}`,
      })
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => (open ? setOpenForm('emailRegistration') : setOpenForm(null))}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={cn(isFirstStep ? 'text-center' : 'text-left')}>
            {isFirstStep ? 'Welcome to Zance' : 'Setup your account'}
          </DialogTitle>
          <DialogDescription className={cn(isFirstStep ? 'text-center' : 'text-left')}>
            {isFirstStep ? 'Home to the brave' : 'Please fill in your correct details'}
          </DialogDescription>
        </DialogHeader>

        {isFirstStep ? (
          <EmailRegistrationForm isRegistering={isRegistering} onSuccess={onRegistrationSubmit} />
        ) : (
          <ProfileForm isCreatingProfile={isCreatingProfile} onSuccess={onProfileSubmit} />
        )}

        {isFirstStep && (
          <DialogFooter className='!flex-col !items-center !justify-center'>
            <DialogDescription className='text-center'>
              Don&apos;t have an account?
            </DialogDescription>

            <Button variant='link' className='text-sm' size='sm' onClick={handleOpenLoginForm}>
              Login with Email
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default EmailRegistrationDialog
