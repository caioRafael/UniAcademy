'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { projetctQueryService } from '../services'
import { ListResponse } from '@/types/ListResponse'
import Project from '@/types/Project'
import { DetailProjectModal } from './DetailProjectModal'

interface ProjectsContainerProps {
  token: string
}

export function ProjectsContainer(props: ProjectsContainerProps) {
  const { token } = props
  const { data } = projetctQueryService.useFindAll(token)

  const results =
    data !== undefined ? (data as ListResponse<Project>).results : []

  function formatDateTimeBrasilia(date: Date): string {
    const brasiliaFormat = new Intl.DateTimeFormat('pt-BR')
    const formattedDateTime = brasiliaFormat.format(new Date(date))

    return formattedDateTime
  }

  return (
    <div className="flex flex-row gap-6 flex-wrap w-full">
      {results.map((project) => (
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
            <div>
              <p>data de publicação</p>
              <p>{formatDateTimeBrasilia(project.data_do_projeto as Date)}</p>
            </div>

            <DetailProjectModal project={project} />
          </CardFooter>
        </Card>
      ))}

      {(results.length === 0 || data === undefined) && (
        <h1>Nenhum projeto cadastrado</h1>
      )}
    </div>
  )
}
