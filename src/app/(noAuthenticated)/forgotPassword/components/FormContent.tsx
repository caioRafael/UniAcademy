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

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
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

    router.replace('/')
    setLoading(false)
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold ">Realize seu cadastro</p>
        <p className="text-xs text-black">
          Faça login ou registre-se para encontre-se na plataforma.
        </p>
      </div>
      <AppForm
        onSubmit={handleSignIn}
        className="w-full flex flex-col items-center justify-center gap-4 mt-9"
        formObject={formSchema}
        setForm={setForm}
      >
        <AppFormInput
          label="Senha"
          placeholder="Senha"
          type="password"
          name="password"
          form={form as UseFormReturn}
        />

        <AppFormInput
          label="Confirme sua senha"
          placeholder="senha"
          type="password"
          name="NewPassword"
          form={form as UseFormReturn}
        />

        <Link
          className="text-xs inline-block self-end text-secondary hover:text-fucsia transition-all hover:underline"
          href="/signIn/forgotPassword"
        >
          Esqueceu sua senha?
        </Link>

        <Button className="w-full mt-4" type="submit">
          {loading ? 'Carregando' : 'Continue'}
        </Button>

        <Link
          className="text-xs inline-block self-end text-black"
          href="/signUp"
        >
          Não possui conta?{' '}
          <span className="font-bold text-secondary">Cadastre-se agora</span>
        </Link>
      </AppForm>
    </>
  )
}
