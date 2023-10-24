'use client'

import { Button } from '@/components/ui/button'
import {
  createForumAnswerQueryService,
  forumAnswersQueryService,
  forumItemQueryService,
} from '../../services'
import { ForumItem } from '../../components/forumItem'
import { Spin } from '@/components/spin'
import { Answer } from './Answer'
import * as z from 'zod'
import { UseFormReturn } from 'react-hook-form'
import { useState } from 'react'
import { AppForm } from '@/components/AppForm/AppForm'
import { AppFormTextAreaInput } from '@/components/AppForm/AppFormTextAreaInput'
import ForumAnswer from '@/types/ForumAnswers'

interface ContentProps {
  token: string
  id: number
  usuario_criacao: number
}

const formSchema = z.object({})

export const Content = ({ token, id, usuario_criacao }: ContentProps) => {
  const { data, isLoading } = forumItemQueryService.useFindOne(
    String(id),
    token,
  )
  const [form, setForm] = useState<UseFormReturn | undefined>(undefined)
  const [isLoadingSentAnswer, setIsLoadingSentAnswer] = useState(false)
  const { mutateAsync: createForum } =
    createForumAnswerQueryService.useCreate(token)

  const forumAnswer = forumAnswersQueryService.useFindAll(token, id)
  const answers = forumAnswer.data as ForumAnswer

  const handleSubmitAnswer = async () => {
    setIsLoadingSentAnswer(true)

    const values = form?.getValues()

    const data = { ...values }
    if (data.texto === undefined || data.texto?.trim() === '') {
      setIsLoadingSentAnswer(false)
      return
    }

    const result = await createForum({
      texto: data.texto,
      usuario_criacao,
      forum: id,
    })

    if (result?.error) {
      setIsLoadingSentAnswer(false)
      return
    }

    form?.reset({ texto: '' })
    forumAnswer.refetch()
    setIsLoadingSentAnswer(false)
  }

  return (
    <section className="pl-6">
      {!isLoading ? (
        <main>
          {data && (
            <>
              <ForumItem isLast {...data} />
              <div className="w-full flex flex-col ">
                <div className="flex flex-row justify-between mt-8 mb-1">
                  <span className="text-xs">Sua resposta</span>
                  <span className="text-xs">Limite de 240 caracteres</span>
                </div>
                <AppForm
                  formObject={formSchema}
                  setForm={setForm}
                  className="flex flex-col gap-8 items-end relative"
                >
                  <span className=" absolute bottom-0 left-[0px] top-[9px] h-[14px] w-[2px] bg-[#D20240] arounded-sm" />
                  <AppFormTextAreaInput
                    type="text"
                    placeholder="Escreva sua resposta"
                    maxLength={240}
                    required
                    name="texto"
                    form={form as UseFormReturn}
                  />
                  <Button
                    onClick={handleSubmitAnswer}
                    type="submit"
                    className="w-[150px]"
                    disabled={isLoadingSentAnswer}
                  >
                    {isLoadingSentAnswer ? <Spin /> : 'Responder'}
                  </Button>
                </AppForm>
              </div>
            </>
          )}
        </main>
      ) : (
        <Spin />
      )}
      {!forumAnswer.isLoading && (
        <div className="relative">
          <h1 className="font-medium pl-1 text-sm w-fit after:absolute after:bottom-0 after:left-[-2px] after:top-[9px] after:h-[13px] after:w-[2px] after:bg-[#D20240] after:rounded-sm mb-2">
            {' '}
            Respostas
          </h1>
          <div>
            {answers.results.map((item) => (
              <div key={item.id} className="mb-4">
                <Answer {...item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
