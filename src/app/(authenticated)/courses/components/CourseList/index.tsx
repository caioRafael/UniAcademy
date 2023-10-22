'use client'

import { Card } from '@/app/(authenticated)/home/components/card'
import { courseQueryService } from '../../create/services'
import { useRouter } from 'next/navigation'
import { Course } from '@/types/Course'
import { Spin } from '@/components/spin'
import { Title } from '@/components/Title'
import { useMemo, useState } from 'react'
import { ListResponse } from '@/types/ListResponse'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CourseListProps {
  categoryId: number
  token: string
  categoryName: string
  myCoursesQuery: string
  graduationName?: string
}

export function CourseList(props: CourseListProps) {
  const {
    categoryId,
    token,
    categoryName,
    myCoursesQuery,
    graduationName = '',
  } = props
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(0)
  const { data, isLoading } = courseQueryService.useFindAll(
    token,
    categoryId,
    myCoursesQuery,
    currentPage,
  )

  const dataCourses = useMemo(() => {
    return data as ListResponse<Course>
  }, [data])

  const totalPages = useMemo(() => {
    if (dataCourses?.count === 0) {
      return 1
    }
    return Math.ceil(dataCourses?.count / 10)
  }, [data])

  const displayCurrentPage = currentPage / 10 + 1

  const redirectToClass = (course: Course) => {
    router.push(`/courses/${course.id}`)
  }

  if (isLoading) return <Spin />

  return (
    <>
      <div className="flex justify-between w-full items-center mb-3 mt-10 pr-10">
        <Title
          title={categoryName}
          hasNavigation={false}
          className="!text-2xl min-w-max"
        />
        <h5 className="border-l-4 border-secondary pl-1 font-semibold">
          {`${data?.count} ${data?.count === 1 ? 'curso' : 'cursos'}`}
        </h5>
      </div>

      <div className="w-full h-full flex gap-6 flex-wrap">
        {dataCourses.results.length > 0 ? (
          dataCourses?.results?.map((course) => (
            <Card
              key={course.id}
              title={course.titulo}
              description={course.descricao}
              url={
                (course.capa as string) || 'https://i.ibb.co/jGQ7qMy/curso.png'
              }
              tag="Programação"
              className="min-w-330 min-h-270"
              onClick={() => redirectToClass(course)}
            />
          ))
        ) : (
          <p className="m-auto mt-10">
            Nenhum curso encontrado para a categoria
            <span className="font-semibold"> {graduationName}</span>
          </p>
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
              disabled={!dataCourses?.previous}
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
              disabled={!dataCourses?.next}
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
