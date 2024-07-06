'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { MenubarItem, MenubarSub, MenubarSubContent, MenubarSubTrigger } from '../menubar'

const ThemeToggler = ({ showInMenu = false }: { showInMenu?: boolean }) => {
  const { theme, setTheme } = useTheme()

  if (showInMenu)
    return (
      <MenubarSub>
        <MenubarSubTrigger>
          <div className='flex items-center gap-2'>
            {theme === 'light' ? (
              <Sun className='text-slate-700 dark:text-slate-200' size={20} />
            ) : (
              <Moon className='text-slate-700 dark:text-slate-200' size={20} />
            )}
            Select Theme
          </div>
        </MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem onClick={() => setTheme('light')}>
            <div className='flex items-center gap-2'>
              <Sun className='text-slate-700 dark:text-slate-200' size={20} />
              Light
            </div>
          </MenubarItem>
          <MenubarItem onClick={() => setTheme('dark')}>
            <div className='flex items-center gap-2'>
              <Moon className='text-slate-700 dark:text-slate-200' size={20} />
              Dark
            </div>
          </MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
    )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeToggler
