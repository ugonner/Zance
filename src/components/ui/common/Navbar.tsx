'use client'

import CreateEventDialog from '@/components/features/events/CreateEventDialog'
import ProfileSheet from '@/components/features/users/ProfileSheet'
import UserAvatar from '@/components/features/users/UserAvatar'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar'
import ROUTES from '@/consts/Routes'
import { DEFAULT_USER } from '@/consts/Users'
import useLogout from '@/hooks/useLogout'
import { getFallbackProfile } from '@/lib/Users'
import { getLoggedInUser } from '@/store/reducers/authSlice'
import { Search } from 'lucide-react'
import { CircleUser, LogOut, UserRoundCog } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

import { Button } from '../button'
import Container from '../containers/Container'
import { Input } from '../input'
import { Separator } from '../separator'
import Logo from './Logo'
import ThemeToggler from './ThemeToggler'

const Navbar = () => {
  const loggedInUser = useSelector(getLoggedInUser)

  const { logout } = useLogout()

  const PROFILE_MENU = [
    {
      title: 'Profile',
      icon: React.createElement(CircleUser),
      path: ROUTES.HOME,
    },
    {
      title: 'Account settings',
      icon: React.createElement(UserRoundCog),
      path: ROUTES.HOME,
    },
    {
      title: 'Separator',
    },
    {
      title: 'Theme Toggler',
    },
    {
      title: 'Separator',
    },
    {
      title: 'Sign out',
      icon: React.createElement(LogOut),
      onClick: logout,
    },
  ]

  const email = loggedInUser?.email

  const userProfile = loggedInUser?.profile || DEFAULT_USER.profile

  const fallbackProfile = getFallbackProfile(userProfile?.fullname)

  // Since we are handling logout differently. We need some custom dialogs only in logout click
  const logoutMenu = PROFILE_MENU.find(menu => menu.title.toLowerCase() === 'sign out')

  // Also we need a sheet trigger while a user clicks profile
  const profileSheetTrigger = PROFILE_MENU.find(menu => menu.title.toLowerCase() === 'profile')

  return (
    <nav className='fixed z-40 w-full border-b bg-background px-4 py-0.5'>
      <Container className='flex items-center justify-between gap-2 text-sm'>
        {/* Right */}
        <Logo />

        {/* Mid */}
        <div className='relative hidden flex-[.8] items-center justify-center md:flex'>
          <Search className='absolute left-4 cursor-pointer' size={20} strokeWidth={2.75} />
          <Input type='text' className='rounded-2xl pl-12' placeholder='Search Events' />
        </div>

        {/* Left */}
        <div className='flex h-10 items-center space-x-4'>
          {/* Create Event */}
          <CreateEventDialog />

          <Separator orientation='vertical' className='hidden md:inline' />

          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className='cursor-pointer'>
                <UserAvatar
                  image={{
                    src: userProfile?.profilePhoto,
                    alt: `Profile image of the user.`,
                  }}
                  fallbackProfile={fallbackProfile}
                />
              </MenubarTrigger>

              <MenubarContent className='p-2 font-medium'>
                <MenubarItem asChild>
                  <ProfileSheet
                    trigger={
                      <div className='flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 hover:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-gray-800 dark:hover:text-gray-50'>
                        <UserAvatar
                          height={10}
                          width={10}
                          image={{
                            src: userProfile?.profilePhoto,
                            alt: `Profile image of the user.`,
                          }}
                          fallbackProfile={fallbackProfile}
                        />

                        <div className='flex flex-col justify-center'>
                          <p className='text-base font-semibold'>{userProfile?.fullname}</p>
                          <p className='text-sm text-gray-600 dark:text-gray-400'>{email}</p>
                        </div>
                      </div>
                    }
                  />
                </MenubarItem>

                <MenubarSeparator />

                {profileSheetTrigger && (
                  <MenubarItem asChild>
                    <ProfileSheet
                      trigger={
                        <div className='flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 hover:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-gray-800 dark:hover:text-gray-50'>
                          {profileSheetTrigger.icon &&
                            React.cloneElement(profileSheetTrigger.icon, {
                              className: 'text-slate-700 dark:text-slate-200',
                              size: 20,
                            })}
                          {profileSheetTrigger.title}
                        </div>
                      }
                    />
                  </MenubarItem>
                )}

                {PROFILE_MENU.map((menu, index) => {
                  // Since we are handling logout and profile link differently
                  if (
                    menu.title.toLowerCase() === 'sign out' ||
                    menu.title.toLocaleLowerCase() === 'profile'
                  )
                    return null

                  if (menu.title.toLowerCase() === 'separator')
                    return <MenubarSeparator key={`${menu.title} of index ${index}`} />

                  if (menu.title.toLowerCase() === 'theme toggler')
                    return <ThemeToggler key={`${menu.title} of index ${index}`} showInMenu />

                  return (
                    <MenubarItem key={`${menu.title} of index ${index}`}>
                      <Link href={menu.path ? menu.path : '#'} className='flex items-center gap-2'>
                        {menu.icon &&
                          React.cloneElement(menu.icon, {
                            className: 'text-slate-700 dark:text-slate-200',
                            size: 20,
                          })}
                        {menu.title}
                      </Link>
                    </MenubarItem>
                  )
                })}

                {logoutMenu && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size='sm'
                        className='flex w-full items-center gap-2 text-sm text-gray-200'>
                        {logoutMenu.icon &&
                          React.cloneElement(logoutMenu.icon, {
                            size: 20,
                          })}
                        {logoutMenu.title}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={logoutMenu.onClick}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </Container>
    </nav>
  )
}

export default Navbar
