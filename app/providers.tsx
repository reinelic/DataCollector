'use client'

import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

type Props = {
  children?: React.ReactNode
}

export const NextAuthProvider = (
  { children }: Props,
  { Component, pageProps: { session, ...pageProps } }: AppProps
) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
