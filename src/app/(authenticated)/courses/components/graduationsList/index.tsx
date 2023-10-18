'use client'

import Graduation, { GraduationItem } from '@/types/Graduation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import {
  courseCategoryQueryService,
  courseQueryService,
} from '../../create/services'
import { Course } from '@/types/Course'
import { CourseList } from '../CourseList'
interface GraduationsListProps {
  token: string
}

export default function GraduationsList({ token }: GraduationsListProps) {
  const { data, isLoading: graduationsIsLoading } =
    courseCategoryQueryService.useFindAll(token)

  const dataGraduations = data as Graduation

  const { data: dataCourses, isLoading: coursesIsLoading } =
    courseQueryService.useFindAll(token)

  const [selectedGraduation, setSelectedGraduation] = useState<GraduationItem>()

  useEffect(() => {
    if (dataGraduations?.results) {
      setSelectedGraduation(dataGraduations?.results?.[0])
    }
  }, [dataGraduations?.results])

  const totalPerCategory = dataCourses?.results?.filter(
    (course: Course) => course.categoria === selectedGraduation?.id,
  ).length

  return (
    <>
      {!graduationsIsLoading && !coursesIsLoading && (
        <>
          <h5 className="border-l-4 border-secondary pl-1 font-semibold mb-7">
            Tenha acesso aos cursos separados por graduação do seu Campus
          </h5>
          <Tabs
            defaultValue={String(data?.results[0].id as number)}
            className="w-full"
          >
            <TabsList>
              {dataGraduations?.results?.map((graduation: GraduationItem) => (
                <TabsTrigger key={graduation.id} value={String(graduation.id)}>
                  {graduation.nome}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="flex gap-10 flex-wrap w-full">
              {totalPerCategory ? (
                dataGraduations?.results?.map((graduation: GraduationItem) => (
                  <TabsContent
                    value={String(graduation.id)}
                    key={graduation.id}
                    className="w-full"
                  >
                    <CourseList
                      categoryId={graduation.id}
                      token={token}
                      categoryName={
                        selectedGraduation?.nome ||
                        dataGraduations?.results?.[0].nome
                      }
                    />
                  </TabsContent>
                ))
              ) : (
                <p className="m-auto mt-10">
                  Nenhum curso encontrado para a categoria
                  <span className="font-semibold">
                    {' '}
                    {selectedGraduation?.nome}
                  </span>
                </p>
              )}
            </div>
          </Tabs>
        </>
      )}
    </>
  )
}
