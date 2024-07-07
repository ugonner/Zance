'use client'

import InterestCard from '@/components/features/users/InterestCard'
import { Button } from '@/components/ui/button'
import Description from '@/components/ui/common/Description'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useToast } from '@/components/ui/use-toast'
import ROUTES from '@/consts/Routes'
import { DEFAULT_USER } from '@/consts/Users'
import useApi from '@/hooks/useApi'
import { formatDateString } from '@/lib/DateTime'
import { getFallbackProfile } from '@/lib/Users'
import { getToken } from '@/store/reducers/authSlice'
import { ProfileResponse } from '@/types'
import { Linkedin, Mail, MapPin, Phone, SquarePen } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import UserAvatar from './UserAvatar'

const ProfileSheet = ({ trigger }: { trigger: React.ReactNode }) => {
  const token = useSelector(getToken)

  const { toast } = useToast()

  const {
    fetchData,
    loading,
    error,
    data: profileData,
  } = useApi<{ token: string }, ProfileResponse>()

  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const hasError = error && !profileData && !loading

  useEffect(() => {
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
  }, [fetchData, toast, token])

  const email = profileData?.data?.user?.email

  const {
    fullname,
    profilePhoto,
    contactDetails,
    socialLinks,
    workplace,
    professionalTitle,
    bio,
    location,
    joiningDate,
    interests,
  } = profileData?.data?.user?.profile || DEFAULT_USER.profile

  const fallbackProfile = getFallbackProfile(fullname)

  const toggleSheet = () => {
    setIsSheetOpen(currState => (currState ? false : true))
  }

  const closeSheet = () => {
    setIsSheetOpen(false)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader className='mt-8'>
          <SheetTitle className='flex items-center justify-between gap-0.5 text-xl font-bold leading-6 tracking-tight lg:text-2xl lg:leading-8'>
            <span>Profile</span>
            {hasError || (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={closeSheet} variant='secondary' size='sm'>
                      <Link href={ROUTES.PROFILE_EDIT}>
                        <SquarePen size={20} strokeWidth={2.5} />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit Profile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </SheetTitle>
        </SheetHeader>

        <Separator className='my-4' />
        {hasError ? (
          <section className='flex h-4/5 flex-col items-center justify-center gap-2'>
            <Description className='text-center !text-base text-red-500'>
              Something went very wrong! Try logging out and logging in again!
            </Description>
          </section>
        ) : (
          <section>
            <div className='flex flex-col justify-center gap-2'>
              <h2 className='text-lg font-semibold'>Basic Information</h2>

              {loading ? (
                <Skeleton className='h-12 w-10/12' />
              ) : (
                <div className='flex flex-wrap items-center gap-4'>
                  <div className='flex items-center gap-2'>
                    <UserAvatar
                      image={{
                        src: profilePhoto || null,
                        alt: `Profile image of the user.`,
                      }}
                      fallbackProfile={fallbackProfile}
                    />

                    <div className='flex flex-col justify-center'>
                      <p className='text-sm font-semibold'>{fullname}</p>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>
                        Joined {formatDateString(joiningDate as string)}
                      </p>
                    </div>
                  </div>

                  <Separator className='py-4' orientation='vertical' />

                  {/* Workplace */}
                  <div className='flex flex-col justify-center'>
                    <h2 className='text-sm font-semibold'>{professionalTitle}</h2>
                    {workplace && (
                      <h3 className='text-sm text-gray-600 dark:text-gray-400'>{workplace}</h3>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Separator className='my-4' />

            {/* Bio */}
            <div className='flex flex-col justify-center gap-2'>
              <h2 className='text-lg font-semibold'>Bio</h2>
              {!loading && !bio ? (
                <p className='text-sm'>You haven&apos;t set your bio yet.</p>
              ) : (
                <>{loading ? <Skeleton className='h-10' /> : <p className='text-sm'>{bio}</p>}</>
              )}
            </div>

            <Separator className='my-4' />

            {/* Socials */}

            <div className='flex flex-col justify-center gap-2'>
              <h2 className='text-lg font-semibold'>Socials</h2>
              {loading ? (
                <Skeleton className='h-6 w-1/3' />
              ) : (
                <Link
                  target='_blank'
                  href={socialLinks?.linkedIn}
                  className='flex items-center gap-2'>
                  <Linkedin size={18} className='text-primary' />
                  <p className='text-sm font-medium hover:font-semibold'>{fullname}</p>
                </Link>
              )}
            </div>

            <Separator className='my-4' />

            {/* Professional Contact */}
            <div className='flex flex-col items-start justify-center gap-2'>
              <h2 className='text-lg font-semibold'>Professional Contact</h2>

              {loading ? (
                <>
                  <Skeleton className='h-6 w-1/4' />
                  <Skeleton className='h-6 w-1/2' />
                  <Skeleton className='h-6 w-1/3' />
                </>
              ) : (
                <>
                  {/* Phone */}
                  <p className='flex items-center gap-2'>
                    <Phone size={18} />
                    <span className='text-sm'>{contactDetails?.phone}</span>
                  </p>

                  {/* Location */}
                  <p className='flex items-center gap-2'>
                    <MapPin size={18} />
                    <span className='text-sm'>{location}</span>
                  </p>

                  {/* Email */}
                  <p className='flex items-center gap-2'>
                    <Mail size={18} />
                    <span className='text-sm'>{email}</span>
                  </p>
                </>
              )}
            </div>

            <Separator className='my-4' />

            {/* Interests */}
            <div className='flex flex-col justify-center gap-2'>
              <h2 className='text-lg font-semibold'>Interests</h2>
              {loading ? (
                <div className='flex flex-wrap items-center gap-2'>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className='h-8 w-20' />
                  ))}
                </div>
              ) : (
                <div className='flex flex-wrap items-center gap-2'>
                  {!interests?.length ? (
                    <p className='text-sm'>You haven&apos;t entered any interest yet.</p>
                  ) : (
                    <>
                      {interests?.map(interest => (
                        <InterestCard key={interest} interest={interest} />
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          </section>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default ProfileSheet
