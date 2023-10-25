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
  certificateQueryService,
  classRoomQueryService,
  courseQueryService,
  moduleQueryService,
} from '../../../create/services'
import ClassesList from '../classesList'
import { Spin } from '@/components/spin'
import FinalProjectModal from '../finalProjectModal'
import { useRouter } from 'next/navigation'
import { finalProjectQueryService } from '../../services'

interface ClassesPlaylistProps {
  token: string
  courseId: number
  usernameId: number
  profileId: number
  userIsStudent: boolean
  userIsTeacher: boolean
}

const ClassesPlaylist = ({
  token,
  courseId,
  usernameId,
  profileId,
  userIsStudent,
  userIsTeacher,
}: ClassesPlaylistProps) => {
  const router = useRouter()
  const { setSelectedClass, selectedCourse, setSelectedCourse } =
    useClassContext()
  const { data: dataClass } = classRoomQueryService.useFindAll(token)
  const { data: dataModule, isLoading: moduleIsLoading } =
    moduleQueryService.useFindAll(token, courseId)
  const { data: course } = courseQueryService.useFindOne(
    String(courseId),
    token as string,
  )

  const { mutateAsync: createCertificate } =
    certificateQueryService.useCreate(token)
  const [openProjectModal, setOpenProjectModal] = useState<boolean>(false)
  const { data: dataFinalProject } = finalProjectQueryService.useFindAll(
    token,
    usernameId,
    Number(courseId),
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

  const handleCreateCertificate = async () => {
    const data = await createCertificate({
      curso: course?.id as number,
      codigo: course?.codigo as string,
      aluno: profileId,
      usuario_criacao: usernameId,
      usuario_atualizacao: usernameId,
    })
    router.replace(`feedback/${data?.id}`)
  }

  return (
    <aside className="px-3 pt-10 pb-16 bg-primary w-72 min-h-screen">
      <div className=" h-full flex flex-col">
        <div>
          <div className="px-3">
            <div className="flex items-center gap-3 mb-4 justify-between">
              <Play className="text-darkRed" />
              <span className="text-background text-sm font-semibold truncate">
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
        {userIsTeacher && (
          <button
            className="bg-black-2 rounded-md py-4 px-2 w-56 text-white text-xxs font-medium flex items-center justify-center gap-5"
            onClick={() => router.push(`/courses/projects/${courseId}`)}
          >
            Projetos Finais
          </button>
        )}
        {userIsStudent && (
          <div className="flex flex-col items-center gap-4">
            <button
              className="bg-black-2 rounded-md py-4 px-2 w-56 text-white text-xxs font-medium flex items-center justify-center gap-5"
              disabled={Boolean(
                (dataFinalProject?.results?.length as number) > 0,
              )}
              onClick={() => setOpenProjectModal(true)}
            >
              {dataFinalProject?.results.length ? (
                <CheckCircle2 className="text-checkGreen" />
              ) : (
                ''
              )}
              Projeto Final
            </button>
            {course && course?.meu_progresso_read?.curso_finalizado && (
              <button
                className="bg-primary rounded-md py-4 px-2 w-56 text-darkRed text-xxs border-darkRed border-2"
                onClick={handleCreateCertificate}
              >
                Emitir Certificado{' '}
              </button>
            )}
          </div>
        )}
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
