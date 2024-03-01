'use client'

import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

type Props = {
  children?: React.ReactNode
}

export const NextAuthProvider = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      {' '}
      <Component {...pageProps} />
    </SessionProvider>
  )
}
