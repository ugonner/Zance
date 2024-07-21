'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import PasswordInput from './PasswordInput'

const registrationFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Please enter a valid email address' })
      .min(2, { message: 'Email must be at least 2 characters long' })
      .max(50, { message: 'Email must be at most 50 characters long' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).max(50),
    passwordConfirm: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(50),
    terms: z.literal(true, {
      errorMap: () => ({
        message: 'You must agree to the terms of use',
      }),
    }),
  })
  .refine(data => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords must match',
  })

const EmailRegistrationForm = ({
  isRegistering = false,
  onSuccess,
}: {
  isRegistering: boolean
  onSuccess: (values: z.infer<typeof registrationFormSchema>) => Promise<boolean>
}) => {
  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      terms: true,
    },
  })

  const onSubmit = async (values: z.infer<typeof registrationFormSchema>) => {
    const success = await onSuccess(values)

    if (success) {
      form.reset()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto flex w-full flex-col justify-center gap-4 py-4 md:gap-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter email address</FormLabel>
              <FormControl>
                <Input placeholder='camelia@zance.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <PasswordInput label='Enter password' placeholder='********' field={field} />
          )}
        />
        <FormField
          control={form.control}
          name='passwordConfirm'
          render={({ field }) => (
            <PasswordInput label='Re-enter password' placeholder='********' field={field} />
          )}
        />
        <FormField
          control={form.control}
          name='terms'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-2'>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>
                  I have read and agreed to the{' '}
                  <Link href='/' className='text-blue-500'>
                    Terms of use
                  </Link>
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>
          {isRegistering ? (
            <span className='flex items-center gap-2'>
              Registering
              <Loader />
            </span>
          ) : (
            'Register'
          )}
        </Button>
      </form>
    </Form>
  )
}

export default EmailRegistrationForm
