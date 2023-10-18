'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ForumAnswerItem } from '@/types/ForumAnswers'
import { getInitialLetters } from '@/utils/getInitialLetters'

export type AnswerItem = {
  nome_usuario_criacao?: string
  id: number
  answer: string
}

export type AnswerProps = ForumAnswerItem

export function Answer({ texto, id, nome_usuario_criacao }: AnswerProps) {
  return (
    <div className={'pb-5 border-b w-full flex flex-col'} key={id}>
      <div className="flex flex-row items-center gap-2 mb-4">
        <Avatar className="w-[40px] h-[40px]">
          <AvatarImage src="" />
          <AvatarFallback>
            {getInitialLetters(nome_usuario_criacao)}
          </AvatarFallback>
        </Avatar>
        <p className="text-xs">{nome_usuario_criacao}</p>
      </div>
      <p className="text-xs ">{texto}</p>
    </div>
  )
}
