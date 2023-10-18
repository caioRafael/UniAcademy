'use client'

import { MessageSquare, Paperclip } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ForumItem } from '@/types/Forum'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitialLetters } from '@/utils/getInitialLetters'
import { formatDate } from '@/utils/formatDate'
import Link from 'next/link'

export type ForumItemProps = {
  isLast?: boolean
  isTruncate?: boolean
} & ForumItem

export function ForumItem({
  arquivo,
  assunto,
  data_criacao,
  id,
  mensagem,
  nome_usuario_criacao,
  titulo,
  isLast = false,
  isTruncate = false,
}: ForumItemProps) {
  const router = useRouter()

  return (
    <div
      className={`pb-6 border-t w-full flex flex-col ${isLast && 'border-b'}`}
      key={id}
    >
      <div
        onClick={() => router.push(`/foruns/${id}`)}
        className="cursor-pointer"
      >
        <div className="flex flex-row gap-2 items-center mt-3">
          <MessageSquare width={24} height={24} className="text-black " />

          <h2 className="text-sm font-semibold">{titulo}</h2>
        </div>

        <p className="text-xs">Assunto: {assunto}</p>
        <p className={`text-xs mt-4 mb-2 ${isTruncate && 'truncate'} `}>
          {mensagem}
        </p>
      </div>

      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2">
          <Avatar className="w-[24px] h-[24px]">
            <AvatarImage src="" />
            <AvatarFallback className="text-[9px]">
              {getInitialLetters(nome_usuario_criacao ?? '')}
            </AvatarFallback>
          </Avatar>
          <p className="text-xs">{nome_usuario_criacao}</p>
        </div>

        <Link
          target="_blank"
          className="flex flex-row gap-2"
          href={arquivo || ''}
        >
          <Paperclip width={24} height={24} className="text-black opacity-50" />
          <p>Arquivo anexado</p>
        </Link>
        <p>Data de criação: {formatDate(data_criacao)}</p>
      </div>
    </div>
  )
}
