import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'

import { getUser } from '@/lib/auth'
import { AvatarMenu } from '@/components/AvatarMenu'
import Profile from '@/types/Profile'
import { DropdownMenuDemo } from './DropdownMenuDemo/DropdownMenuDemo'
import { ProfileContainer } from '@/components/ProfileContainer'
import { BellRing } from 'lucide-react'
import SideBar from '@/components/SideBar'

import logo from '@/assets/logo.svg'
import Image from 'next/image'

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
        <Image src={logo} height={30} width={304} alt="Logo UniAcademy" />

        <input
          type="text"
          className="bg-white rounded-sm w-[500px] py-2.5 px-2 placeholder:text-slate-400"
          placeholder="O que você quer aprender?"
        />
        <div className="flex items-center justify-center gap-8">
          <div className="text-white">
            <DropdownMenuDemo>
              <BellRing />
            </DropdownMenuDemo>
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
