'use client'

import { profileQueryService } from '@/app/(authenticated)/services'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface AvatarIconProps {
  userId: number
  token: string
  hasName?: boolean
}

export function AvatarIcon(props: AvatarIconProps) {
  const { userId, token, hasName = false } = props
  const { data } = profileQueryService.useFindOne(String(userId), token)
  const initalsName = data
    ? (data?.nome_completo.split(' ') as string[])
    : 'User'
  return (
    <>
      <Avatar className="w-14 h-14 mt-[-10px]">
        <AvatarImage src={data?.foto} />
        <AvatarFallback>
          {initalsName[0].charAt(0).toUpperCase()}
          {initalsName[1]?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {hasName && <strong>{`${initalsName[0]} ${initalsName[1]}`}</strong>}
    </>
  )
}
