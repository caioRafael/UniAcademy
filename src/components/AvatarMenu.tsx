'use client'

import Profile from '@/types/Profile'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface AvatarMenuProps {
  profile: Profile
}

export function AvatarMenu(props: AvatarMenuProps) {
  const router = useRouter()
  const initalsName = props.profile?.nome_completo.split(' ') as string[]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center gap-1">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>
            {initalsName[0].charAt(0).toUpperCase()}
            {initalsName[1]?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <ChevronDown className="text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Opções de perfil</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/profile')}>
          Vizualizar perfil
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
