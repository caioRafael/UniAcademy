'use client'

import { ReactNode, useEffect } from 'react'
import { Form } from '../ui/form'
import { UseFormReturn, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

interface AppFormProps {
  children: ReactNode
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: z.infer<any>) => Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formObject: z.ZodObject<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setForm: (form: UseFormReturn) => void
}

export function AppForm(props: AppFormProps) {
  const { children, className, onSubmit, formObject, setForm } = props
  const form = useForm<z.infer<typeof formObject>>({
    resolver: zodResolver(formObject),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {},
  })

  useEffect(() => {
    setForm(form)
  }, [form, setForm])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </Form>
  )
}
