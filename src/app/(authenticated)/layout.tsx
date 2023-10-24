import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'

import { getUser } from '@/lib/auth'
import { AvatarMenu } from '@/components/AvatarMenu'
import Profile from '@/types/Profile'
import { ProfileContainer } from '@/components/ProfileContainer'
import SideBar from '@/components/SideBar'

import logo from '@/assets/logo.svg'
import Image from 'next/image'

interface AppLayoutProps {
  children: ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const hasAuthenticated = await getServerSession(nextAuthOptions)
  const { profile, token } = await getUser()

  if (!hasAuthenticated) redirect('/')
  return (
    <div className="flex flex-col max-h-screen">
      <header className="bg-primary px-10 py-5 flex justify-between items-center h-16">
        <Image src={logo} height={30} width={304} alt="Logo UniAcademy" />

        <div className="flex items-center justify-center gap-8">
          <AvatarMenu profile={profile as Profile} />
        </div>
      </header>
      <ProfileContainer profile={profile as Profile} token={token} />
      <div className="grid h-full w-full grid-cols-[16rem_1fr]">
        <SideBar profile={profile} />
        <main className="flex w-full h-full overflow-auto">{children}</main>
      </div>
    </div>
  )
}
