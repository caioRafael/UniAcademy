'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { useState } from 'react'
import { User } from 'lucide-react'

import { Spin } from '@/components/spin'
import { useClassContext } from '../../context/ClassesContext'
import { courseQueryService } from '../../../create/services'
export interface SubscribeModalProps {
  token: string
  userId: number
}

export function SubscribeModal({ token, userId }: SubscribeModalProps) {
  const [showModal, setShowModal] = useState(false)
  const [loading] = useState<boolean>(false)
  const [showButton, setShowButton] = useState(true)
  const { selectedCourse } = useClassContext()

  const { mutateAsync: patchCourse, isLoading: loadPatchCourse } =
    courseQueryService.useUpdate(token, selectedCourse?.id)

  const handleSubscribeCourse = async () => {
    setShowModal(false)

    const usuariosComAcesso = [
      ...(selectedCourse?.usuarios_com_acesso as number[]),
      userId as number,
    ]

    await patchCourse({
      usuarios_com_acesso: usuariosComAcesso,
    })

    setShowButton(false)
  }

  return (
    <Dialog open={showModal}>
      <DialogTrigger asChild>
        {showButton && (
          <Button onClick={() => setShowModal(true)} disabled={loading}>
            Inscrever-se Agora
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        onClick={() => setShowModal(false)}
        className="sm:max-w-[50%] gap-0"
      >
        <h1 className="font-semibold text-3xl after:block w-fit after:h-[3px] after:w-[60%] after:bg-[#D20240] after:rounded-sm mb-4">
          Confirmação de inscrição
        </h1>

        <h3 className="text-sm  mb-2">{selectedCourse?.titulo}</h3>
        <p className="text-xxs mb-6">{selectedCourse?.descricao}</p>

        <div className="flex flex-row gap-2 mb-10">
          <User width={24} height={24} className="text-black opacity-50" />
          <p>Matriculados: {selectedCourse?.usuarios_com_acesso?.length}</p>
        </div>

        <DialogFooter className="sm:justify-center sm:space-x-6">
          <Button variant={'outline'} onClick={() => setShowModal(false)}>
            Deixar para depois
          </Button>
          <Button onClick={handleSubscribeCourse}>
            {loadPatchCourse ? <Spin /> : 'Confirmar Inscrição'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
