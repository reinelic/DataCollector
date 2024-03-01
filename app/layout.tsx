import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/Navbar'
import { NextAuthProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Data Collector ',
  description: 'Collectimg voice data for the TWB',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='h-full'>
      <NextAuthProvider>
        <body className={cn('antialised relative h-full font-sans')}>
          <Navbar />

          <main className='relative flex min-h-screen flex-col'>
            <div className='flex-1 flex-grow'>{children}</div>
          </main>
        </body>
      </NextAuthProvider>
    </html>
  )
}
