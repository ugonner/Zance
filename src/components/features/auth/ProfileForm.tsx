'use client'

import { Button } from '@/components/ui/button'
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
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import { z } from 'zod'

import CustomPhoneInput from './CustomPhoneInput'

const profileFormSchema = z.object({
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
  linkedInLink: z.string().url({ message: 'Please enter a valid URL' }),
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
})

const ProfileForm = ({
  isCreatingProfile = false,
  onSuccess,
}: {
  isCreatingProfile: boolean
  onSuccess: (values: z.infer<typeof profileFormSchema>) => void
}) => {
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
    onSuccess(values)
  }

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
                <Textarea rows={4} placeholder='Describe yourself shortly' {...field} />
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

        <Button type='submit'>
          {isCreatingProfile ? (
            <span className='flex items-center gap-2'>
              Creating
              <Loader />
            </span>
          ) : (
            'Create'
          )}
        </Button>
      </form>
    </Form>
  )
}

export default ProfileForm
