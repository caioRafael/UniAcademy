'use client'

import { Title } from '@/components/Title'
import { courseQueryService } from '../../create/services'
import { Spin } from '@/components/spin'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { finalProjectQueryService } from '../../[id]/services'
import { FinalProject } from '@/types/FinalProject'
import { useMemo } from 'react'
import { ListResponse } from '@/types/ListResponse'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitialLetters } from '@/utils/getInitialLetters'
import {
  AlertCircleIcon,
  CheckCircle2,
  DownloadIcon,
  XCircleIcon,
} from 'lucide-react'
import Link from 'next/link'
import { UpdateProjectModal } from './components/updateProjectModal'

export interface ContentProps {
  token: string
  id: number
}
export function Content({ id, token }: ContentProps) {
  const { data: course, isLoading: isLoadingCourses } =
    courseQueryService.useFindOne(String(id), token as string)
  const { data: dataFinalProjects, isLoading: isLoadingFinalProjects } =
    finalProjectQueryService.useFindAll(token, '', Number(id))

  const dataFinalProjectsMemorized = useMemo(() => {
    return dataFinalProjects as ListResponse<FinalProject>
  }, [dataFinalProjects])

  return (
    <div className="w-full flex flex-col px-8 pt-16 gap-10">
      {!isLoadingCourses ? (
        <>
          <Title title={course?.titulo || ''} />
          {!isLoadingFinalProjects && (
            <div className="flex flex-row flex-wrap justify-start">
              {dataFinalProjectsMemorized?.results?.map((item) => (
                <Card
                  key={item.id}
                  className="w-[40%] flex flex-col justify-between mb-4 mr-4"
                >
                  <CardHeader className="flex flex-row w-full items-center mb-4 justify-between">
                    <div className="flex flex-row items-center gap-2 ">
                      <Avatar className="w-[40px] h-[40px]">
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {getInitialLetters(
                            item?.nome_usuario_criacao_read || '',
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-xs ">
                        {item?.nome_usuario_criacao_read}
                      </p>
                    </div>
                    {item.resultado === 'pendente' && (
                      <UpdateProjectModal
                        token={token}
                        idProject={item?.id || 0}
                        studentName={item?.nome_usuario_criacao_read || ''}
                      />
                    )}
                  </CardHeader>
                  <CardContent className="flex flex-row justify-between">
                    <Link
                      target="_blank"
                      href={(item.arquivo as string) || ''}
                      className="flex flex-row items-center gap-2 "
                    >
                      <DownloadIcon />
                      <span className="text-xxs font-semibold">
                        Baixar Projeto
                      </span>
                    </Link>

                    {item.resultado === 'reprovado' && (
                      <div className="flex flex-row items-center gap-2 ">
                        <span className="mr-1 bg-black rounded-full p-1.5">
                          <XCircleIcon className="text-secondary" />
                        </span>
                        <span className="text-xxs font-semibold">
                          Reprovado
                        </span>
                      </div>
                    )}

                    {item.resultado === 'aprovado' && (
                      <div className="flex flex-row items-center gap-2 ">
                        <span className="mr-1 bg-black rounded-full p-1.5">
                          <CheckCircle2 color="#70EF6E" />
                        </span>
                        <span className="text-xxs font-semibold">Aprovado</span>
                      </div>
                    )}

                    {item.resultado === 'pendente' && (
                      <div className="flex flex-row items-center gap-2 ">
                        <span className="mr-1 bg-black rounded-full p-1.5">
                          <AlertCircleIcon color="#EAC02C" />
                        </span>
                        <span className="text-xxs font-semibold">Pendente</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      ) : (
        <Spin />
      )}
    </div>
  )
}
