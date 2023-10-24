'use client'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, ChevronRight, Play } from 'lucide-react'
import { ModuleItem } from '@/types/Module'
import { useClassContext } from '../../context/ClassesContext'
import { useEffect, useState } from 'react'
import { Course } from '@/types/Course'
import { ListResponse } from '@/types/ListResponse'
import {
  classRoomQueryService,
  courseQueryService,
  moduleQueryService,
} from '../../../create/services'
import ClassesList from '../classesList'
import { Spin } from '@/components/spin'
import FinalProjectModal from '../finalProjectModal'

interface ClassesPlaylistProps {
  token: string
  courseId: number
  usernameId: number
}

const ClassesPlaylist = ({
  token,
  courseId,
  usernameId,
}: ClassesPlaylistProps) => {
  const { setSelectedClass, selectedCourse, setSelectedCourse } =
    useClassContext()
  const { data: dataClass } = classRoomQueryService.useFindAll(token)
  const { data: dataModule, isLoading: moduleIsLoading } =
    moduleQueryService.useFindAll(token, courseId)
  const { data: course } = courseQueryService.useFindOne(
    String(courseId),
    token as string,
  )
  const [openProjectModal, setOpenProjectModal] = useState<boolean>(false)

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
            <div className="flex items-center gap-3 mb-4 justify-between">
              <Play className="text-darkRed" />
              <span className="text-background text-xxxxs font-semibold">
                {selectedCourse?.titulo}
              </span>
              <ChevronRight className="text-background" />
            </div>
            <Progress
              value={course?.meu_progresso_read?.progresso_curso}
              className="bg-slate-200 h-1"
            />
          </div>
          <div className="mt-7">
            {dataModule && !moduleIsLoading ? (
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
                      <ClassesList moduleId={Number(module.id)} token={token} />
                    </AccordionItem>
                  </Accordion>
                ),
              )
            ) : (
              <div className="flex justify-center mb-4">
                <Spin />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <button
            className="bg-black-2 rounded-md py-4 px-2 w-56 text-white text-xxs font-medium flex items-center justify-center gap-5"
            disabled={false}
            onClick={() => setOpenProjectModal(true)}
          >
            <CheckCircle2 className="text-checkGreen" />
            Projeto Final
          </button>
          <button className="bg-primary rounded-md py-4 px-2 w-56 text-darkRed text-xxs border-darkRed border-2">
            Emitir Certificado
          </button>
        </div>
      </div>
      {openProjectModal && (
        <FinalProjectModal
          openProjectModal={openProjectModal}
          setOpenProjectModal={setOpenProjectModal}
          course={course as Course}
          token={token}
          usernameId={usernameId}
        />
      )}
    </aside>
  )
}

export default ClassesPlaylist
