'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import Project from '@/types/Project'
import { formatDate } from '@/utils/formatDate'
import { Paperclip } from 'lucide-react'
import { useState } from 'react'

interface CreateProjectModalProps {
  project: Project
}

export function DetailProjectModal(props: CreateProjectModalProps) {
  const { project } = props
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button variant={'outline'} onClick={() => setOpenModal(true)}>
          Visualizar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50%]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-4 w-3/5 items-center">
            <h1 className="font-semibold text-xs">Informações</h1>
            <div className="w-full h-1 bg-secondary rounded-sm" />
          </div>

          <div className="flex gap-2 items-center">
            <Badge className="bg-secondary">Categoria</Badge>
            <p>{formatDate(project.data_do_projeto + '')}</p>
          </div>
        </DialogHeader>
        <div className="flex flex-col w-full gap-4 pb-10">
          <h1 className="border-l-4 border-secondary pl-1 font-semibold text-xs">
            {project.titulo}
          </h1>
          <p>{project.descricao}</p>

          {project.anexo && (
            <a
              href={project.anexo as string}
              className="w-40 h-10 flex items-center justify-center gap-2 text-secondary border border-secondary bg-white hover:bg-secondary hover:text-white transition-all rounded-md"
            >
              <Paperclip /> Anexo
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
