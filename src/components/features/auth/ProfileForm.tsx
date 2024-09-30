'use client'

import { Button } from '@/components/ui/button'
import FullPageError from '@/components/ui/common/FullPageError'
import FullPageLoader from '@/components/ui/common/FullPageLoader'
import Loader from '@/components/ui/common/Loader'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import useApi from '@/hooks/useApi'
import { getToken } from '@/store/reducers/authSlice'
import { ProfileFormData, ProfileResponse } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { BadgeCheck, CalendarDays, Copy, Upload } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import CreatableSelect from 'react-select/creatable'
import { z } from 'zod'

import CustomPhoneInput from './CustomPhoneInput'

export const profileFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters long' })
    .max(100, { message: 'Full name must be at most 100 characters long' }),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: 'Please enter a valid phone number',
  }),
  professionalTitle: z
    .string()
    .min(2, {
      message: 'Professional Title must be at least 2 characters long',
    })
    .max(100, {
      message: 'Professional Title must be at most 100 characters long',
    }),
    linkedInLink: z.preprocess((value) => (value === "" ? undefined : value), z.string().url({message: "Enter a valid url"}).optional()),
  workPlace: z
    .string()
    .max(100, { message: 'Work place must be at most 100 characters long' })
    .optional(),
  location: z
    .string()
    .min(2, { message: 'Location must be at least 2 characters long' })
    .max(100, { message: 'Location must be at most 100 characters long' }),
  bio: z.string().max(1000, { message: 'Bio must be at most 1000 characters long' }).optional(),
  interests: z.array(z.string()),
  profilePhotoFile: z
    .any()
    .optional()
    .refine(file => !file || file instanceof File, 'Expected a file'),
})

const ProfileForm = ({
  isProcessing = false,
  onSuccess,
  isInEditMode = false,
}: {
  isProcessing: boolean
  onSuccess: (values: z.infer<typeof profileFormSchema>) => Promise<void>
  isInEditMode?: boolean
}) => {
  const token = useSelector(getToken)

  const {
    fetchData,
    loading,
    error: fetchingError,
    data: profileData,
  } = useApi<{ token: string }, ProfileResponse>()

  const { toast } = useToast()

  useEffect(() => {
    if (!isInEditMode) return

    const getUserProfile = async () => {
      try {
        if (token) {
          await fetchData('user/profile', token)
        }
      } catch (err) {
        toast({
          variant: 'destructive',
          title: `Something went wrong while fetching profile details! ${err}`,
        })
      }
    }

    getUserProfile()
  }, [fetchData, toast, token, isInEditMode])

  // Feed existing user profile data in to the form
  useEffect(() => {
    if (profileData && isInEditMode) {
      // @ts-ignore
      const profile = profileData?.data?.user?.profile
      form.reset({
        fullName: profile?.fullname || '',
        phoneNumber: profile?.contactDetails?.phone || '',
        professionalTitle: profile?.professionalTitle || '',
        linkedInLink: profile?.socialLinks?.linkedIn || '',
        workPlace: profile?.workplace || '',
        location: profile?.location || '',
        bio: profile?.bio || '',
        interests: profile?.interests || [],
        // @ts-ignore
        profilePhoto: profile?.profilePhoto || '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData, isInEditMode])

  const profilePhotoInputRef = useRef<HTMLInputElement>(null)
  const handleProfilePhotoClick = () => {
    if (profilePhotoInputRef.current) {
      profilePhotoInputRef.current.click()
    }
  }

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      professionalTitle: '',
      linkedInLink: '',
      workPlace: '',
      location: '',
      bio: '',
      interests: [],
    },
  })

  const onSubmit = (values: z.infer<typeof profileFormSchema>) => {
    // Uncomment this if needed in future
    // if (!form?.formState?.isDirty)
    //   return toast({
    //     variant: 'destructive',
    //     title: `You need to make some changes in order to continue!`,
    //   })

    onSuccess(values)
  }

  if (loading && !fetchingError) return <FullPageLoader />

  if (isInEditMode && !loading && fetchingError)
    return (
      <FullPageError
        title="Oops! Couldn't fetch profile details"
        description={fetchingError?.message}
      />
    )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto flex w-full flex-col justify-center gap-4 py-4 md:gap-6'>
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder='Start with your first name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <CustomPhoneInput value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-col gap-6 md:flex-row md:items-center'>
          <FormField
            control={form.control}
            name='professionalTitle'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Professional Title</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your professional title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='workPlace'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>
                  Work Place <span className='ml-1 text-gray-500'>(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='Enter company/startup name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-6 md:flex-row md:items-center'>
          <FormField
            control={form.control}
            name='linkedInLink'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>
                  LinkedIn Link <span className='ml-1 text-gray-500'>(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='Enter Professional Link' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder='Merryside, London' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your Bio</FormLabel>
              <FormControl>
                <Textarea rows={6} placeholder='Describe yourself shortly' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='interests'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your interests</FormLabel>
              <FormControl>
                <CreatableSelect
                  isMulti
                  value={
                    field?.value?.map(interest => ({
                      label: interest,
                      value: interest,
                    })) || {
                      label: '',
                      value: '',
                    }
                  }
                  onChange={selected => field.onChange(selected.map(item => item.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='profilePhotoFile'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <div
                    onClick={handleProfilePhotoClick}
                    className='flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 p-8 text-center text-sm'>
                    <Upload />
                    {field.value ? field?.value?.name : 'Upload a new profile picture to update'}
                  </div>
                  <input
                    type='file'
                    accept='image/*'
                    className='hidden'
                    ref={profilePhotoInputRef}
                    onChange={e => (e.target.files ? field.onChange(e.target.files[0]) : null)}
                  />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isProcessing}>
          {isProcessing ? (
            <span className='flex items-center gap-2'>
              {isInEditMode ? 'Updating' : 'Creating'}
              <Loader />
            </span>
          ) : isInEditMode ? (
            'Update'
          ) : (
            'Create'
          )}
        </Button>
      </form>
    </Form>
  )
}

export default ProfileForm
