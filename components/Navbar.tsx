'use client'

import MaxWidthWrapper from './MaxWidthWrapper'
import NavItems from './NavItems'
import { useSession, signOut } from 'next-auth/react'
import { authConfig } from '../auth'
import { useEffect, useState } from 'react'

export const Navbar = () => {
  const [user, setUser] = useState<any>(null)

  const { data: session, status } = useSession()
  console.log(session)

  return (
    <div className='sticky inset-x-0 top-0 z-50 h-16 bg-white'>
      <header className='relative bg-white'>
        <MaxWidthWrapper>
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>
              {/* {MOBILE NAV} */}

              <div className='ml-4 flex lg:ml-0'>DataCollector</div>

              <div className='z-50 ml-auto hidden lg:ml-8 lg:block '>
                <span onClick={() => signOut()}>{user && 'Sign out'}</span>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}
