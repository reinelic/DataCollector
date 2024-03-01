import Image from 'next/image'
import googleLogo from '@/public/google.png'

import { GoogleSignInButton } from '@/components/AuthButtons'
import { getServerSession } from 'next-auth'
import { authConfig } from '../../auth'
import { redirect } from 'next/navigation'
import { getCsrfToken } from 'next-auth/react'

export default async function Login() {
  const session = await getServerSession(authConfig)

  if (session) return redirect('/')

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center '>
      <h3 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
        Demo <span className='text-blue-600'> Data Collector</span>.
      </h3>
      <div className='mt-4 flex flex-col items-center p-10 shadow-md'>
        <GoogleSignInButton />
      </div>
    </div>
  )
}
