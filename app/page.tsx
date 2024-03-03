import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import AudioRecorder from '@/components/AudioRecorder'

import {
  authConfig,
  loginIsRequiredServer,
  loginIsRequiredClient,
} from '../auth'

import { getServerSession } from 'next-auth'
import type { Metadata } from 'next'

export default async function Page() {
  // await loginIsRequiredServer()

  const session = await getServerSession(authConfig)
  console.log('session')

  return (
    <MaxWidthWrapper>
      <AudioRecorder />
    </MaxWidthWrapper>
  )
}
