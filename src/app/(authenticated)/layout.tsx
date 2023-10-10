import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'

import { getUser } from '@/lib/auth'
import { AvatarMenu } from '@/components/AvatarMenu'
import Profile from '@/types/Profile'
import { ProfileContainer } from '@/components/ProfileContainer'
import { BellRing } from 'lucide-react'
import SideBar from '@/components/SideBar'
interface AppLayoutProps {
  children: ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const hasAuthenticated = await getServerSession(nextAuthOptions)
  const { profile } = await getUser()

  if (!hasAuthenticated) redirect('/')
  return (
    <div className="flex flex-col max-h-screen">
      <header className="bg-primary px-10 py-5 flex justify-between items-center h-16">
        <h1 className="font-polarisFuturistic text-3xl text-white">
          uniacademy
        </h1>
        <input
          type="text"
          className="bg-white rounded-sm w-[500px] py-2.5 px-2 placeholder:text-slate-400"
          placeholder="O que você quer aprender?"
        />
        <div className="flex items-center justify-center gap-8">
          <div className="text-white">
            <BellRing />
          </div>
          <AvatarMenu profile={profile as Profile} />
        </div>
      </header>
      <ProfileContainer profile={profile as Profile} />
      <div className="grid h-full w-full grid-cols-[16rem_1fr]">
        <SideBar profile={profile as Profile} />
        <main className="flex w-full h-full overflow-auto">{children}</main>
      </div>
    </div>
  )
}
