'use client'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { useState } from 'react'

import { Spin } from '@/components/spin'
import { finalProjectQueryService } from '../../../[id]/services'

export interface UpdateProjectModalProps {
  token: string
  idProject: number
  studentName: string
}

export function UpdateProjectModal({
  token,
  idProject,
  studentName,
}: UpdateProjectModalProps) {
  const [showModal, setShowModal] = useState(false)

  const { mutateAsync: updateProject, isLoading: isUpdating } =
    finalProjectQueryService.useUpdate(token, idProject)

  const handleUpdateProject = async (status: string) => {
    setShowModal(false)
    await updateProject({
      resultado: status,
    })
  }

  return (
    <Dialog open={showModal}>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          onClick={() => setShowModal(true)}
          disabled={isUpdating}
        >
          Avaliar
        </Button>
      </DialogTrigger>
      <DialogContent
        onClick={() => setShowModal(false)}
        className="sm:max-w-[40%]"
      >
        <h1 className="font-semibold text-3xl after:block w-fit after:h-[3px] after:w-[60%] after:bg-[#D20240] after:rounded-sm mb-2">
          Projeto final do curso
        </h1>
        <div>
          <h2 className="text-sm text-center">Avalie o projeto do aluno</h2>
          <h2 className="text-sm text-center font-semibold">{studentName}</h2>
        </div>

        <div className="w-full flex flex-row gap-5  justify-center">
          <Button
            variant={'outline'}
            onClick={() => handleUpdateProject('reprovado')}
          >
            {isUpdating ? <Spin /> : 'Reprovar'}
          </Button>
          <Button onClick={() => handleUpdateProject('aprovado')}>
            {isUpdating ? <Spin /> : 'Aprovar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
