'use client'

import Link from 'next/link'

const NavLink = ({ link }: { link: { url: string; name: string } }) => {
  return (
    <Link className='text-black-400 p-1 hover:cursor-pointer hover:text-blue-400' href={link.url}>
      {link.name}
    </Link>
  )
}

export default NavLink
