'use client'

import { AppForm } from '@/components/AppForm/AppForm'
import { AppFormInput } from '@/components/AppForm/AppFormInput'
import { AppFormInputPassword } from '@/components/AppForm/AppFormInputPassword'
import { Spin } from '@/components/spin'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  username: z.string({
    required_error: 'Informe o seu email para efetuar o login',
  }),
  password: z.string({
    required_error: 'Informe a senha para efetuar o login',
  }),
})

export const FormContent = () => {
  const [form, setForm] = useState<UseFormReturn | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const handleSignIn = async (value: z.infer<typeof formSchema>) => {
    setLoading(true)
    const result = await signIn('credentials', {
      username: value.username,
      password: value.password,
      redirect: false,
    })

    if (result?.error) {
      setLoading(false)
      return
    }

    router.replace('/home')
    setLoading(false)
  }

  return (
    <div>
      <div className="flex flex-col gap-2">
        <p className="text-4xl font-semibold ">Entre na sua conta</p>
        <p className="text-xs text-normal">
          Entre agora ou cadastre-se para começar os seus estudos.
        </p>
      </div>
      <AppForm
        onSubmit={handleSignIn}
        className="w-full flex flex-col items-center justify-center gap-4 mt-7"
        formObject={formSchema}
        setForm={setForm}
      >
        <AppFormInput
          label="E-mail"
          placeholder="Digite seu e-mail"
          type="text"
          name="username"
          form={form as UseFormReturn}
        />

        <AppFormInputPassword
          label="Senha"
          placeholder="Digite sua senha"
          name="password"
          form={form as UseFormReturn}
        />

        <Link
          className="text-xs inline-block self-end text-secondary hover:text-fucsia transition-all hover:underline"
          href="/forgotPassword"
        >
          Esqueceu sua senha?
        </Link>

        <Button className="w-full mt-4" type="submit">
          {loading ? <Spin /> : 'Continue'}
        </Button>

        <Link
          className="text-xs inline-block self-end text-black"
          href="/signUp"
        >
          Não possui conta?{' '}
          <span className="font-normal text-secondary">Cadastre-se agora</span>
        </Link>
      </AppForm>
    </div>
  )
}
