import { NextAuthOptions, getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

import GoogleProvider from 'next-auth/providers/google'

const google = process.env.GOOGLE_CLIENT_SECRET

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,

      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
}

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig)
  if (!session) return redirect('/login')
}

// export function loginIsRequiredClient() {
//   if (typeof window !== 'undefined') {
//     const session = useSession()
//     const router = useRouter()
//     if (!session) router.push('/login')
//   }
// }
