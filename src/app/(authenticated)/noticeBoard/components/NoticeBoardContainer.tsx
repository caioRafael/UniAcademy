'use client'

import { noticeBoardQueryService } from '../services'
import { CalendarDays } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { DetailWarningModal } from './DetailWarningModal'
import { EmptyState } from '@/components/EmptyState'

interface NoticeBoardContainerProps {
  token: string
}
export function NoticeBoardContainer({ token }: NoticeBoardContainerProps) {
  const { data } = noticeBoardQueryService.useFindAll(token)

  function formatDateTimeBrasilia(date: Date): string {
    const brasiliaFormat = new Intl.DateTimeFormat('pt-BR')
    const formattedDateTime = brasiliaFormat.format(new Date(date))

    return formattedDateTime
  }
  return (
    <div className="flex flex-row gap-6 flex-wrap w-full">
      {data &&
        data.results.map((project) => (
          <Card
            key={project.id}
            className="w-[47%] flex flex-col justify-between"
          >
            <CardHeader className="flex flex-row w-full items-center justify-between">
              <h1 className="border-l-4 border-secondary pl-1 font-semibold text-xs">
                {project.titulo}
              </h1>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3">{project.descricao}</p>
            </CardContent>
            <CardFooter className="flex flex-row items-center justify-between">
              <div className="flex gap-2 items-center">
                <CalendarDays />
                <div className="flex flex-col">
                  <p>data de publicação</p>
                  <p>
                    {formatDateTimeBrasilia(project.data_da_publicacao as Date)}
                  </p>
                </div>
              </div>

              <DetailWarningModal warning={project} />
            </CardFooter>
          </Card>
        ))}

      {data && (data.results.length === 0 || data === undefined) && (
        <EmptyState />
      )}
    </div>
  )
}
