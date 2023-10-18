'use client'

import { Card } from '@/app/(authenticated)/home/components/card'
import { courseQueryService } from '../../create/services'
import { useRouter } from 'next/navigation'
import { Course } from '@/types/Course'
import { Spin } from '@/components/spin'
import { Title } from '@/components/Title'

interface CourseListProps {
  categoryId: number
  token: string
  categoryName: string
}

export function CourseList(props: CourseListProps) {
  const { categoryId, token, categoryName } = props
  const router = useRouter()
  const { data, isLoading } = courseQueryService.useFindAll(token, categoryId)

  const listCourses = data?.results.filter(
    (course) => course.categoria === categoryId,
  )

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
        {listCourses?.map((course) => (
          <Card
            key={course.id}
            title={course.titulo}
            description={course.descricao}
            url={
              (course.capa as string) || 'https://i.ibb.co/jGQ7qMy/curso.png'
            }
            tag="Programação"
            className="min-w-[330px] min-h-[270px]"
            onClick={() => redirectToClass(course)}
          />
        ))}
      </div>
    </>
  )
}
