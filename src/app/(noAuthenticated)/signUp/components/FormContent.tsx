'use client'

import { AppForm } from '@/components/AppForm/AppForm'
import { AppFormInput } from '@/components/AppForm/AppFormInput'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { profileQueryService, userQueryService } from '../sevices'
import { Spin } from '@/components/spin'
import { toast } from '@/components/ui/use-toast'
import { AppFormInputPassword } from '@/components/AppForm/AppFormInputPassword'

interface FormContentProps {
  typeProfile: 'professor' | 'aluno' | 'visitante'
}

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Este campo é obrigatório',
    })
    .email({
      message: 'Informe um Email válido',
    }),
  nome_completo: z.string({
    required_error: 'Este campo é obrigatório',
  }),
  password: z
    .string({
      required_error: 'Este campo é obrigatório',
    })
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .refine(
      (value) =>
        /([a-z])/.test(value) &&
        /([0-9])/.test(value) &&
        /[-+_!@#$%^&*., ?]/.test(value),
      'A senha precisa conter números, letras ou símbolos',
    ),
  comfirmPassword: z
    .string({
      required_error: 'Este campo é obrigatório',
    })
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .refine(
      (value) =>
        /([a-z])/.test(value) ||
        /([0-9])/.test(value) ||
        /[-+_!@#$%^&*., ?]/.test(value),
      'A senha precisa conter números, letras ou símbolos',
    ),
  matricula: z.string({
    required_error: 'A matricula é obrigatória',
  }),
})

export const FormContent = (props: FormContentProps) => {
  const { typeProfile } = props
  const [form, setForm] = useState<UseFormReturn | undefined>(undefined)
  const [progress, setProgress] = useState<number>(0)
  const { mutateAsync: save, isLoading } = userQueryService.useCreate()
  const { mutateAsync: saveProfile, isLoading: isLoadProfile } =
    profileQueryService.useCreate()
  const router = useRouter()

  const handleCreateUser = async (value: z.infer<typeof formSchema>) => {
    if (value.matricula === '' && typeProfile !== 'visitante') {
      toast({
        title: 'Matrícula',
        description: 'Este campo é obrigatório',
        variant: 'destructive',
      })
      throw new Error('Este campo é obrigatório')
    }

    if (value.password !== value.comfirmPassword) {
      toast({
        title: 'Erro',
        description: 'Senhas não conferem',
        variant: 'destructive',
      })
      throw new Error('As senhas não conferem')
    }

    const response = await save({
      username: value.email,
      ...value,
    })

    const responseProfile = await saveProfile({
      nome_completo: value.nome_completo,
      tipo_usuario: typeProfile,
      matricula: value.matricula,
      usuario: response?.id as number,
    })

    if (response && responseProfile) {
      const signInResponse = await signIn('credentials', {
        username: value.email,
        password: value.password,
        redirect: false,
      })

      if (signInResponse) router.replace('/home')
    }
  }

  const next = () => {
    if (progress === 0) setProgress(1)
  }

  const back = () => {
    if (progress === 1) setProgress(0)
  }

  const validateTextButton = () => {
    if (isLoading || isLoadProfile) return <Spin />
    return progress === 0 ? 'Prosseguir' : 'Concluir'
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-4xl font-semibold ">Crie sua conta</p>
        <p className="text-xs text-normal">
          Cadastre-se agora para desfrutar dos melhores conteúdos em um só
          lugar.
        </p>
      </div>
      <AppForm
        onSubmit={handleCreateUser}
        className="w-full flex flex-col items-center justify-center gap-4 mt-9"
        formObject={formSchema}
        setForm={setForm}
      >
        <div className={` ${progress === 0 ? 'w-full' : 'sr-only w-0'}`}>
          <AppFormInput
            label="E-mail"
            placeholder="Digite seu e-mail"
            type="text"
            name="email"
            form={form as UseFormReturn}
          />

          {typeProfile !== 'visitante' && (
            <AppFormInput
              label="Matricula"
              placeholder="Digite sua matricula"
              type="text"
              name="matricula"
              form={form as UseFormReturn}
            />
          )}

          <AppFormInput
            label="Nome"
            placeholder="Digite seu nome"
            type="text"
            name="nome_completo"
            form={form as UseFormReturn}
          />
        </div>

        <div className={` ${progress === 1 ? 'w-full' : 'sr-only'}`}>
          <AppFormInputPassword
            label="Senha"
            placeholder="Digite sua senha"
            name="password"
            form={form as UseFormReturn}
          />

          <AppFormInputPassword
            label="Confirme sua senha"
            placeholder="Digite sua senha"
            name="comfirmPassword"
            form={form as UseFormReturn}
          />

          <p className="text-xxs font-normal text-gray-500 mb-2 mt-4">
            A senha deverá ter no mínimo 8 caracteres
          </p>
          <p className="text-xxs font-normal text-gray-500 ">
            A senha precisa conter números, letras ou símbolos
          </p>
        </div>

        <div className="flex flex-row items-center justify-center w-full gap-2">
          {progress === 1 && (
            <Button
              className="w-full mt-4 flex border-black"
              variant={'outline'}
              onClick={back}
            >
              Voltar
            </Button>
          )}

          <Button
            className="w-full mt-4 flex"
            type={progress === 1 ? 'submit' : undefined}
            onClick={next}
          >
            {validateTextButton()}
          </Button>
        </div>

        <Link className="text-xs inline-block self-end text-black" href="/">
          Já possui conta?{' '}
          <span className="font-normal text-secondary">Entre agora</span>
        </Link>
      </AppForm>
    </>
  )
}
