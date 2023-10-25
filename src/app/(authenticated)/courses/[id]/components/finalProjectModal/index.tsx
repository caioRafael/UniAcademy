'use client'

import { AppForm } from '@/components/AppForm/AppForm'
import { AppFormFileInput } from '@/components/AppForm/AppFormFileInput'
import { Title } from '@/components/Title'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'
import { Upload } from 'lucide-react'
import { SetStateAction, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { finalProjectQueryService } from '../../services'
import { Course } from '@/types/Course'
import { Spin } from '@/components/spin'
interface FinalProjectModalProps {
  openProjectModal: boolean
  setOpenProjectModal: React.Dispatch<SetStateAction<boolean>>
  token: string
  course: Course
  usernameId: number
}

const formSchema = z.object({
  arquivo: z.string({
    required_error: 'Inclua um anexo',
  }),
})

const FinalProjectModal = ({
  openProjectModal,
  setOpenProjectModal,
  token,
  course,
  usernameId,
}: FinalProjectModalProps) => {
  const [project, setProject] = useState<UseFormReturn | undefined>(undefined)
  const { mutateAsync: createFinalProject, isLoading } =
    finalProjectQueryService.useCreate(token)
  const [file, setFile] = useState<File | null>()

  const sendFinalProject = async () => {
    const data: any = new FormData()
    const { titulo, id } = course

    if (file) {
      data.append('arquivo', file as File)
    }
    data.append('descricao', `Projeto final do curso ${titulo}`)
    data.append('resultado', 'pendente')
    data.append('data_criacao', new Date().toDateString())
    data.append('usuario_criacao', usernameId)
    data.append('curso', id)

    if (file) {
      await createFinalProject(data)
        .then(() => {
          setFile(null)
          setOpenProjectModal(false)
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <Dialog open={openProjectModal} onOpenChange={setOpenProjectModal}>
      <DialogContent className="sm:max-w-[757px] px-8 py-8">
        <DialogHeader className="mb-3">
          <Title
            title="Projeto final do curso"
            hasNavigation={false}
            className="mb-0"
          />
        </DialogHeader>
        <div>
          {isLoading ? (
            <div className="flex justify-center">
              <Spin />
            </div>
          ) : (
            <AppForm setForm={setProject} formObject={formSchema}>
              <div className="mb-5">
                <span className="text-black text-xxs font-semibold border-l-xxs border-darkRed pl-1 mr-4">
                  Descrição
                </span>
                <p className="mt-4">
                  {course?.descricao_projeto_final ||
                    'Desenvolva o projeto final do curso proposto pelo professor para praticar o que foi aprendido. Em breve o docente irá avaliar e te dar um feedback. Bons estudos!'}
                </p>
              </div>
              <div>
                <AppFormFileInput
                  label="Anexo"
                  placeholder="Anexo"
                  name="arquivo"
                  form={project as UseFormReturn}
                  setFile={setFile}
                  inputLabel="Adicionar projeto"
                  icon={<Upload />}
                />
              </div>
            </AppForm>
          )}
        </div>
        <DialogFooter className="flex !justify-center gap-5 mt-10">
          <Button
            variant="outline"
            type="submit"
            onClick={() => setOpenProjectModal(false)}
            disabled={isLoading}
          >
            Deixar para depois
          </Button>
          <Button
            disabled={!file || isLoading}
            type="submit"
            onClick={sendFinalProject}
          >
            Enviar projeto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FinalProjectModal
