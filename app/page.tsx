import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import AudioRecorder from '@/components/AudioRecorder'

import { authConfig, loginIsRequiredServer } from '../auth'

import { getServerSession } from 'next-auth'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'datacollector',
  description: 'this is the',
}

export default async function Page() {
  await loginIsRequiredServer()

  const session = await getServerSession(authConfig)

  return (
    <MaxWidthWrapper>
      <AudioRecorder />
    </MaxWidthWrapper>
  )
}
