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

          <main className=' flex min-h-screen flex-col justify-center '>
            <div className='flex  flex-grow flex-col'>{children}</div>
          </main>
        </body>
      </NextAuthProvider>
    </html>
  )
}
