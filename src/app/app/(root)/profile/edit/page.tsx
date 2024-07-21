'use client'

import ProfileForm from '@/components/features/auth/ProfileForm'
import Heading from '@/components/ui/common/Heading'
import { useToast } from '@/components/ui/use-toast'
import ROUTES from '@/consts/Routes'
import useApi from '@/hooks/useApi'
import { getToken, setUserFullname } from '@/store/reducers/authSlice'
import { ProfileData, ProfileFormData, ProfileResponse } from '@/types'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const EditProfilePage = () => {
  const router = useRouter()
  const { toast } = useToast()

  const token = useSelector(getToken)

  const dispatch = useDispatch()

  const { updateData, loading: isUpdatingProfile } = useApi<ProfileData, ProfileResponse>()

  const onProfileSubmit = async (values: ProfileFormData) => {
    try {
      const profileDataPayload = {
        profile: {
          fullname: values.fullName,
          professionalTitle: values.professionalTitle,
          workplace: values.workPlace,
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

      if (token) {
        const updatedUser = await updateData('user/profile', profileDataPayload, token)

        const updatedFullname = updatedUser?.data?.profile?.fullname
        dispatch(setUserFullname({ fullname: updatedFullname }))
      }

      router.push(ROUTES.HOME)

      toast({
        title: `Profile Updated Successfully!`,
      })
    } catch (err) {
      toast({
        variant: 'destructive',
        title: `${err}`,
      })
    }
  }

  return (
    <section className='mx-auto max-w-3xl'>
      <Heading type='secondary'>Edit User Profile</Heading>
      <ProfileForm isProcessing={isUpdatingProfile} onSuccess={onProfileSubmit} isInEditMode />
    </section>
  )
}

export default EditProfilePage
