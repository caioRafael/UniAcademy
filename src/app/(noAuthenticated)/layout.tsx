import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { BackgroundImage } from './components/BackgroundImage'

interface AppLayoutProps {
  children: ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const hasAuthenticated = await getServerSession(nextAuthOptions)
  if (hasAuthenticated) redirect('/home')

  return (
    <div className="min-w-screen min-h-screen grid grid-cols-[50%_1fr]">
      <BackgroundImage />
      {children}
    </div>
  )
}
