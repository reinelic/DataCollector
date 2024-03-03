'use client'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Link from 'next/link'

import { useSession, signOut } from 'next-auth/react'

const UserAccountNav = ({ logout }: any) => {
  const { data: session, status } = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='overflow-visible'>
        <Button variant='ghost' size='sm' className='relative'>
          My account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-60 bg-white' align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-0.5 leading-none'>
            <p className='text-sm font-medium text-black'>
              {session?.user?.name}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout} className='cursor-pointer'>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav
