'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useMemo, useState } from 'react'
import {
  courseCategoryQueryService,
  courseQueryService,
} from '../../create/services'
import { CourseCategory } from '@/types/Course'
import { CourseList } from '../CourseList'
import { Category } from '@/types/Category'
interface GraduationsListProps {
  token: string
  userIsTeacher: boolean
  userId: number
}

export default function GraduationsList({
  token,
  userId,
  userIsTeacher,
}: GraduationsListProps) {
  const { data: dataCategory, isLoading: dataCategoryIsLoading } =
    courseCategoryQueryService.useFindAll(token)

  const { isLoading: coursesIsLoading } = courseQueryService.useFindAll(token)

  const myCoursesQuery = useMemo(() => {
    if (userIsTeacher) {
      return userId?.toString()
    }

    return ''
  }, [userId, userIsTeacher])

  const [selectedGraduation, setSelectedGraduation] = useState<CourseCategory>()

  useEffect(() => {
    if (dataCategory?.results) {
      setSelectedGraduation(dataCategory?.results?.[0])
    }
  }, [dataCategory?.results])

  return (
    <>
      {!dataCategoryIsLoading && !coursesIsLoading && (
        <>
          <h5 className="border-l-4 border-secondary pl-1 font-semibold mb-7">
            Tenha acesso aos cursos separados por graduação do seu Campus
          </h5>
          <Tabs
            defaultValue={String(dataCategory?.results[0].id as number)}
            className="w-full"
          >
            <TabsList>
              {dataCategory?.results?.map((graduation: CourseCategory) => (
                <TabsTrigger
                  key={graduation.id}
                  value={String(graduation.id)}
                  onClick={() => setSelectedGraduation(graduation)}
                >
                  {graduation.nome}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="flex gap-10 flex-wrap w-full">
              {dataCategory?.results?.map((graduation: Category) => (
                <TabsContent
                  value={String(graduation.id)}
                  key={graduation.id}
                  className="w-full"
                >
                  <CourseList
                    categoryId={graduation.id as number}
                    token={token}
                    categoryName={
                      selectedGraduation?.nome ||
                      dataCategory?.results?.[0].nome
                    }
                    myCoursesQuery={myCoursesQuery}
                    graduationName={selectedGraduation?.nome}
                  />
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </>
      )}
    </>
  )
}
