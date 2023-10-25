'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { useState } from 'react'

import { AppForm } from '@/components/AppForm/AppForm'
import { AppFormInput } from '@/components/AppForm/AppFormInput'
import * as z from 'zod'
import { Spin } from '@/components/spin'
import { UseFormReturn } from 'react-hook-form'
import { AppFormTextAreaInput } from '@/components/AppForm/AppFormTextAreaInput'
import { clipItemQueryService } from '../../services'
import { useVideoPlayerContext } from '../../context/VideoPlayContext'
import { useClassContext } from '../../context/ClassesContext'

export interface CreateForumModalProps {
  token: string
  usuario_criacao: number
}

const formSchema = z.object({
  titulo: z.string({
    required_error: 'Informe o título',
  }),
  mensagem: z.string({
    required_error: 'Informe a mensagem',
  }),
})

export function CreateClipModal({
  token,
  usuario_criacao,
}: CreateForumModalProps) {
  const { createClip, setCreateClip } = useVideoPlayerContext()
  const { selectedClass } = useClassContext()
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState<UseFormReturn | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const { mutateAsync: create } = clipItemQueryService.useCreate(token)

  const handleSubmit = async () => {
    setLoading(true)
    setShowModal(false)
    const values = form?.getValues()

    const data = { ...values }

    //@ts-ignore
    await create({
      titulo: data.titulo,
      descricao: data.descricao,
      tempo_inicial: createClip.initial,
      tempo_final: createClip.final,
      usuario_criacao,
      aula: selectedClass?.id || 0,
    })

    form?.reset({
      titulo: '',
      describe: '',
    })

    setCreateClip({ isStarted: false, initial: 0, final: 0 })
    setLoading(false)
  }

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          disabled={createClip.final === 0 || loading}
          className="bg-zinc-900"
          onClick={() => setShowModal(true)}
        >
          Continuar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50%]">
        <AppForm formObject={formSchema} setForm={setForm}>
          <h1 className="font-semibold text-3xl after:block w-fit after:h-[3px] after:w-[60%] after:bg-[#D20240] after:rounded-sm mb-2">
            Clipar aula
          </h1>
          <div className="w-full flex flex-col gap-5 ">
            <AppFormInput
              label="Título"
              placeholder="Título"
              type="text"
              name="titulo"
              maxLength={240}
              form={form as UseFormReturn}
            />

            <AppFormTextAreaInput
              label="Descrição"
              placeholder="Descrição"
              type="text"
              name="descricao"
              maxLength={240}
              form={form as UseFormReturn}
            />

            <DialogFooter>
              <Button onClick={handleSubmit}>
                {loading ? <Spin /> : 'Criar clipagem'}
              </Button>
            </DialogFooter>
          </div>
        </AppForm>
      </DialogContent>
    </Dialog>
  )
}
