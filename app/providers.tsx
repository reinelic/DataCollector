'use client'

import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

type Props = {
  children?: React.ReactNode
}

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>
}
