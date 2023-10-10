'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { forumItemQueryService, forumQueryService } from '../../services'
import { getInitialLetters } from '@/utils/getInitialLetters'

interface ContentProps {
  token: string
  id: string
}

export const Content = ({ token, id }: ContentProps) => {
  const { data, isLoading, error } = forumItemQueryService.useFindOne(id, token)
  console.log('data', data, isLoading, error)

  return (
    <section className="pl-6">
      <p className="text-xxs">Responder Mensagem do Fórum</p>
      <div className="w-full mt-1 border rounded-sm overflow-hidden rounded-sm">
        <header className="bg-gray px-6 py-3 text-xxs flex justify-between">
          <div className="flex  gap-4 ">
            <span>{data?.titulo}</span>
            <span>{data?.nome_usuario_criacao}</span>
          </div>
          <span>{data?.data_criacao}</span>
        </header>
        <main className="flex flex-row py-10 px-24 gap-8">
          <Avatar className="w-[60px] h-[60px]">
            <AvatarImage src="" />
            <AvatarFallback>
              {getInitialLetters(data?.nome_usuario_criacao ?? '')}
            </AvatarFallback>
          </Avatar>
          <div className="w-full flex flex-col gap-10">
            <p>{data?.mensagem}</p>
            <form className="flex flex-col gap-8 items-end">
              <Textarea
                className="text-[14px]"
                placeholder="Responder mensagem"
              />
              <Button className="w-[150px]">Enviar</Button>
            </form>
          </div>
        </main>
      </div>
    </section>
  )
}
