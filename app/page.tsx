import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import AudioRecorder from '@/components/AudioRecorder'
import { Metadata } from 'next'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { authConfig, loginIsRequiredServer } from '../auth'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const Metadata: Metadata = {
  title: 'Data collector project',
}

export default async function Home() {
  // await loginIsRequiredServer()

  // const session = await getServerSession(authConfig)

  return (
    <MaxWidthWrapper>
      <AudioRecorder />
    </MaxWidthWrapper>
  )
}
