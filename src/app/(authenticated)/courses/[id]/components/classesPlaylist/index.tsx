'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, ChevronRight, Play } from 'lucide-react'
import { ModuleItem } from '@/types/Module'
import { useClassContext } from '../../context/ClassesContext'
import { useEffect } from 'react'
import { Course } from '@/types/Course'
import { ListResponse } from '@/types/ListResponse'
import {
  classRoomQueryService,
  courseQueryService,
  moduleQueryService,
} from '../../../create/services'
import ClassRoom from '@/types/Classroom'

interface ClassesPlaylistProps {
  token: string
  courseId: number
}

const ClassesPlaylist = ({ token, courseId }: ClassesPlaylistProps) => {
  const { setSelectedClass, selectedCourse, setSelectedCourse } =
    useClassContext()
  const { data: dataClass } = classRoomQueryService.useFindAll(token)
  const { data: dataModule } = moduleQueryService.useFindAll(token, courseId)
  const { data: course } = courseQueryService.useFindOne(
    String(courseId),
    token as string,
  )

  useEffect(() => {
    const firstModuleId: number = dataModule?.results[0]?.id as number
    setSelectedClass(
      dataClass?.results.find(
        (classItem) => classItem.modulo === firstModuleId,
      ),
    )
  }, [dataClass, courseId, dataModule])

  useEffect(() => {
    setSelectedCourse(course as Course)
  }, [course])

  return (
    <aside className="px-3 pt-10 pb-16 bg-primary w-72 min-h-screen">
      <div className=" h-full flex flex-col">
        <div>
          <div className="px-3">
            <div className="flex items-center gap-3 mb-4 justify-between cursor-pointer">
              <Play className="text-darkRed" />
              <span className="text-background text-xxxxs font-semibold">
                {selectedCourse?.titulo}
              </span>
              <ChevronRight className="text-background" />
            </div>
            <Progress value={74} className="bg-slate-200 h-1 " />
          </div>
          <div className="mt-7">
            {dataModule &&
              (dataModule as ListResponse<ModuleItem>).results?.map(
                (module: ModuleItem) => (
                  <Accordion
                    key={module.id}
                    type="single"
                    collapsible
                    className="w-full"
                  >
                    <AccordionItem value="item-1" className="border-b-0">
                      <AccordionTrigger className="text-background decoration-primary">
                        <span className="text-background text-xxs font-medium text-left">
                          {module.titulo}
                        </span>
                      </AccordionTrigger>
                      <ul className="bg-darkGrey mb-3">
                        {dataClass?.results?.map(
                          (moduleClass: ClassRoom) =>
                            moduleClass.modulo === module.id && (
                              <AccordionContent
                                key={moduleClass.id}
                                className="bg-darkGrey mb-3"
                              >
                                <li
                                  className="flex items-center gap-6 py-4 px-2 cursor-pointer"
                                  onClick={() => setSelectedClass(moduleClass)}
                                >
                                  <CheckCircle2 className="text-checkGreen" />
                                  <span className="text-white text-xxxs font-medium">
                                    {moduleClass.titulo}
                                  </span>
                                </li>
                              </AccordionContent>
                            ),
                        )}
                      </ul>
                    </AccordionItem>
                  </Accordion>
                ),
              )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <button className="bg-black-2 rounded-md py-4 px-16 w-56 text-white text-xxs font-medium">
            Projeto Final
          </button>
          <button className="bg-primary rounded-md py-4 px-2 w-56 text-darkRed text-xxs border-darkRed border-2">
            Emitir Certificado
          </button>
        </div>
      </div>
    </aside>
  )
}

export default ClassesPlaylist
