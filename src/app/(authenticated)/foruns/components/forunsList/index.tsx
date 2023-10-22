'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { forumItemQueryService } from '../../services'
import Forum from '@/types/Forum'
import { ForumItem } from '../forumItem'
import { Spin } from '@/components/spin'
import { useMemo, useState } from 'react'

export interface ForunsListProps {
  token: string
  usuario_criacao?: number
  query?: string
  ordering: string
}

export function ForunsList({
  token,
  usuario_criacao,
  query,
  ordering,
}: ForunsListProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const { data, isLoading } = forumItemQueryService.useFindAll(
    token,
    usuario_criacao,
    query,
    currentPage,
    ordering,
  )

  const displayCurrentPage = currentPage / 10 + 1
  const dataForum = useMemo(() => {
    return data as Forum
  }, [data])

  const totalPages = useMemo(() => {
    if (dataForum?.count === 0) {
      return 1
    }
    return Math.ceil(dataForum?.count / 10)
  }, [data])

  return (
    <>
      <div>
        {isLoading && (
          <div className="w-full m-8 flex justify-center">
            <Spin />
          </div>
        )}
        {!isLoading &&
          dataForum?.results.length > 0 &&
          dataForum?.results.map((item, index) => (
            <ForumItem
              key={item.id}
              isLast={dataForum?.results.length === index + 1}
              isTruncate
              {...item}
            />
          ))}
        {!isLoading &&
          (dataForum?.results === undefined ||
            dataForum?.results.length === 0) && (
            <span className="text-xxs">
              {query !== ''
                ? 'Vamos lá, crie o primeiro fórum!'
                : 'Nenhum fórum encontrado'}
            </span>
          )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {!isLoading && (
          <>
            <span className="text-xxs">
              Página {displayCurrentPage} de {totalPages}
            </span>
            <button
              onClick={() => {
                setCurrentPage((value) => value - 10)
              }}
              disabled={!dataForum?.previous}
            >
              <ChevronLeft
                width={24}
                height={24}
                className="text-black opacity-50"
              />
            </button>
            <button
              onClick={() => {
                setCurrentPage((value) => value + 10)
              }}
              disabled={!dataForum?.next}
            >
              <ChevronRight
                width={24}
                height={24}
                className="text-black opacity-50"
              />
            </button>
          </>
        )}
      </div>
    </>
  )
}
