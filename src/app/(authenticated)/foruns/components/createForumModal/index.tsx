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
import { AppFormFileInput } from '@/components/AppForm/AppFormFileInput'
import { forumItemQueryService } from '../../services'

export interface CreateForumModalProps {
  token: string
  usuario_criacao: number
}

const formSchema = z.object({
  arquivo: z.string().optional(),
  assunto: z.string({
    required_error: 'Informe o assunto',
  }),
  titulo: z.string({
    required_error: 'Informe o título',
  }),
  mensagem: z.string({
    required_error: 'Informe a mensagem',
  }),
})

export function CreateForumModal({
  token,
  usuario_criacao,
}: CreateForumModalProps) {
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState<UseFormReturn | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const { mutateAsync: createForum } = forumItemQueryService.useCreate(token)
  const [file, setFile] = useState<File | null>()

  const handleSubmit = async () => {
    setLoading(true)
    setShowModal(false)
    const values = form?.getValues()

    const data = { ...values }

    await createForum({
      arquivo: file as File,
      assunto: data.assunto,
      mensagem: data.mensagem,
      titulo: data.titulo,
      usuario_criacao,
    })

    form?.reset({
      titulo: '',
      assunto: '',
      mensagem: '',
      arquivo: '',
    })

    setLoading(false)
  }

  return (
    <Dialog open={showModal}>
      <DialogTrigger asChild>
        <Button onClick={() => setShowModal(true)} disabled={loading}>
          Criar fórum
        </Button>
      </DialogTrigger>
      <DialogContent
        onClick={() => setShowModal(false)}
        className="sm:max-w-[50%]"
      >
        <AppForm formObject={formSchema} setForm={setForm}>
          <h1 className="font-semibold text-3xl after:block w-fit after:h-[3px] after:w-[60%] after:bg-[#D20240] after:rounded-sm mb-2">
            Criação de fórum
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
            <AppFormInput
              label="Assunto"
              placeholder="Assunto"
              type="text"
              name="assunto"
              maxLength={240}
              form={form as UseFormReturn}
            />
            <AppFormTextAreaInput
              label="Mensagem"
              placeholder="Mensagem"
              type="text"
              name="mensagem"
              maxLength={240}
              form={form as UseFormReturn}
            />
            <AppFormFileInput
              label="Anexo"
              placeholder="anexo"
              name="arquivo"
              form={form as UseFormReturn}
              setFile={setFile}
            />
            <DialogFooter>
              <Button onClick={handleSubmit}>
                {loading ? <Spin /> : 'Publicar'}
              </Button>
            </DialogFooter>
          </div>
        </AppForm>
      </DialogContent>
    </Dialog>
  )
}
