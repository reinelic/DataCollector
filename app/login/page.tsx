import Image from 'next/image'
import googleLogo from '@/public/google.png'

import { GoogleSignInButton } from '@/components/AuthButtons'
import { getServerSession } from 'next-auth'
import { authConfig } from '../../auth'
import { redirect } from 'next/navigation'
import { getCsrfToken } from 'next-auth/react'

export default async function Login() {
  const session = await getServerSession(authConfig)

  console.log('Session: ', session)

  if (session) return redirect('/')

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center py-2'>
      <div className='mt-10 flex flex-col items-center p-10 shadow-md'>
        <h1 className='mb-4 mt-10 text-4xl font-bold'>Sign In on TWB</h1>
        <GoogleSignInButton />
      </div>
    </div>
  )
}
