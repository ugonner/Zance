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
import {
  EmailRegistrationFormData,
  EmailRegistrationResponse,
  FormType,
  LoginFormData,
  LoginResponse,
  ProfileData,
  ProfileFormData,
  ProfileResponse,
  User,
} from '@/types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button } from '../../ui/button'
import EmailRegistrationForm from './EmailRegistrationForm'
import ProfileForm, { profileFormSchema } from './ProfileForm'
import { z } from 'zod';
import { setUser } from '../../../store/reducers/authSlice';
import { setCookie } from '../../../utils/Cookies'
const EmailRegistrationDialog = ({
  isOpen,
  setOpenForm,
}: {
  isOpen: boolean
  setOpenForm: (formName: FormType) => void
}) => {
  const { toast } = useToast()
  const dispatch = useDispatch();
  const { createData, loading: isRegistering } = useApi<
    EmailRegistrationFormData,
    EmailRegistrationResponse
  >()

  const { updateData, loading: isCreatingProfile } = useApi<ProfileData, ProfileResponse>()

  // A state that will track the form steps - for multi step form.
  const [step, setStep] = useState<1 | 2>(1)

  // Helpful derived states for reusability
  const isFirstStep = step === 1
  

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

      const response = await createData('auth/register', registrationData);
      toast({
        title: `${response?.message}! Please login to your account to continue!`,
      });
      //setOpenForm('login')
      
      const loginCredentials: LoginFormData = {
        email: values.email,
        password: values.password,
      }
      const res = await createData('auth/login', loginCredentials) as unknown as LoginResponse

      const token = res?.data?.token
      setCookie("token", token, {path: "/"});

      const userData = res?.data?.user
 
      // @ts-ignore
      dispatch(setUser({ user: userData, token }))


      toast({
        title: `${response?.message}! Now Please take a time to setup your profile!`,
      })

      setStep(2);

      return true
    } catch (err) {
      toast({
        variant: 'destructive',
        title: `${err}`,
      })
      return false
    }
  }

  const onProfileSubmit = async (values: z.infer<typeof profileFormSchema>) => {
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

      await updateData('user/profile', profileDataPayload)

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
          <ProfileForm isProcessing={isCreatingProfile} onSuccess={onProfileSubmit} />
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
