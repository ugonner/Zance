'use client'

import Logo from '@/components/ui/common/Logo'
import ROUTES from '@/consts/Routes'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import NavLink from './NavLink'

interface LinkProps {
  url: string
  name: string
}

const links: LinkProps[] = [
  { url: '#about', name: 'About Us' },
  { url: '#contact', name: 'Contact Us' },
  { url: '#event', name: 'Create an Event' },
]

const Navbar: React.FC = () => {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)

  const topVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: 45,
      backgroundColor: 'black',
    },
  }
  const centerVariants = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  }

  const bottomVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: -45,
      backgroundColor: 'black',
    },
  }

  const listVariants = {
    closed: {
      x: '100vw',
    },
    opened: {
      x: 0,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  }

  const listItemVariants = {
    closed: {
      x: -10,
      opacity: 0,
    },
    opened: {
      x: 0,
      opacity: 1,
    },
  }

  return (
    <div className='bg-white-400 flex h-full items-center justify-between px-4 text-xl sm:px-8 md:px-12 lg:px-20 xl:px-48'>
      {/* LOGO */}
      <div className='md:hidden lg:flex xl:justify-center'>
        <Link href='/' className='flex items-start justify-center p-1 font-semibold'>
          <Logo />
        </Link>
      </div>
      {/* LINKS */}
      <div className='hidden w-1/2 gap-4 md:flex'>
        {links.map(link => (
          <NavLink link={link} key={link.name} />
        ))}
      </div>

      {/* RESPONSIVE MENU */}
      <div className='md:hidden'>
        {/* MENU BUTTON */}
        <button
          className='relative z-50 flex h-8 w-10 flex-col justify-between'
          onClick={() => setOpen(prev => !prev)}>
          <motion.div
            variants={topVariants}
            animate={open ? 'opened' : 'closed'}
            className='bg-black-400 h-1 w-10 origin-left rounded'></motion.div>
          <motion.div
            variants={centerVariants}
            animate={open ? 'opened' : 'closed'}
            className='bg-black-400 h-1 w-10 rounded'></motion.div>
          <motion.div
            variants={bottomVariants}
            animate={open ? 'opened' : 'closed'}
            className='bg-black-400 h-1 w-10 origin-left rounded'></motion.div>
        </button>
        {/* MENU LIST */}
        {open && (
          <motion.div
            variants={listVariants}
            initial='closed'
            animate='opened'
            className='bg-white-400 absolute left-0 top-0 z-40 flex h-screen w-screen flex-col items-center justify-center gap-8 text-2xl'>
            {links.map(link => (
              <motion.div variants={listItemVariants} className='' key={link.name}>
                <Link href={link.url} className='text-black-400'>
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <Link className='text-black-400' href='/'>
              Login
            </Link>
          </motion.div>
        )}
      </div>
      <div className='hidden items-center justify-center gap-2 md:flex'>
        <button
          className='bg-black-400 mr-1 rounded px-2.5 py-3 text-gray-50'
          onClick={() => router.push(ROUTES.AUTH)}>
          Login
        </button>
        {/* ?\this should be a dropdown */}
        <button className='text-black-400 rounded border-2 border-black bg-gray-100 px-2.5 py-3'>
          En
        </button>
      </div>
    </div>
  )
}

export default Navbar
