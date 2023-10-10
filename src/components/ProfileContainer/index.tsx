'use client'

import { usePathname } from 'next/navigation'
import Profile from '@/types/Profile'
import { UserProfileConainer } from './UserProfileConainer'
import { UserStatus } from './UserStatus'
import { Settings } from 'lucide-react'
import { Button } from '../ui/button'
import { UserSocialMedia } from './UserSocialMedia'

interface ProfileContainerProps {
  profile: Profile
}

export function ProfileContainer(props: ProfileContainerProps) {
  const { profile } = props
  const pathname = usePathname()
  const currentPage = pathname.split('/')[1]

  if (currentPage !== 'profile') return null

  return (
    <div className="max-h-72 w-full bg-gray-profile pt-3 p-9 text-white flex flex-col">
      <header className="flex flex-row items-center justify-between w-full h-14 mb-3">
        <div>
          <h1 className="font-semibold text-sm">Perfil do usuário</h1>
          <div className="w-28 h-1 rounded-sm bg-secondary" />
        </div>

        <Button variant={'ghost'}>
          <Settings />
        </Button>
      </header>
      <div className="grid grid-cols-[1fr_1fr_1fr]">
        <UserProfileConainer profile={profile} />
        <UserStatus />
        <UserSocialMedia />
      </div>
    </div>
  )
}
