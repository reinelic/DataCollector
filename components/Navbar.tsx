'use client'

import MaxWidthWrapper from './MaxWidthWrapper'
import NavItems from './NavItems'
import { useSession, signOut } from 'next-auth/react'
import { authConfig } from '../auth'
import { useEffect, useState } from 'react'
import { buttonVariants } from './ui/button'
import UserAccountNavbar from './UserAccountNavbar'
import Link from 'next/link'

export const Navbar = () => {
  const [user, setUser] = useState<any>(null)

  const { data: session, status } = useSession()
  console.log(session)

  return (
    <div className='z-100  relative inset-x-0 top-0 h-16 bg-white'>
      <header className=' bg-white'>
        <MaxWidthWrapper>
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center justify-between'>
              {/* {MOBILE NAV} */}

              <div className='ml-4 flex font-bold text-blue-500 lg:ml-0'>
                <Link href='/'>DataCollector</Link>
              </div>

              <div className=' ml-auto hidden lg:ml-8 lg:block '>
                {/* <span onClick={() => signOut()} className='cursor-pointer'>
                  {session?.user?.name && 'Sign out'}
                </span> */}
                {session?.user && (
                  <UserAccountNavbar logout={() => signOut()} />
                )}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}
