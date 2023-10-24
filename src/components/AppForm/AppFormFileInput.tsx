'use client'

import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { File } from 'lucide-react'
import { useState } from 'react'

interface AppFormInputProps {
  label: string
  name: string
  form: UseFormReturn | undefined
  placeholder?: string
  description?: string
  required?: boolean
  setFile: any
  inputLabel?: string
  icon?: any
}

export function AppFormFileInput(props: AppFormInputProps) {
  const {
    label,
    name,
    form,
    description,
    required,
    setFile,
    inputLabel,
    icon,
  } = props

  const [fileName, setFileName] = useState('')

  function handleChange(event: any) {
    console.log('event.target.files[0]', event.target.files[0])
    setFile(event.target.files[0])
    setFileName(event.target.files[0]?.name)
  }

  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field: { name, onBlur, onChange, ref } }) => (
        <FormItem className="w-full">
          <FormLabel className="text-xxs">
            {label} {required && <span className="text-darkRed">*</span>}
            <div className="cursor-pointer mt-2 flex flex-col gap-2 py-5 items-center justify-center  w-full rounded-md border border-border bg-white px-3 py-2 text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-muted-foreground placeholder:text-xxs focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50">
              {icon || <File width={24} height={24} className="text-black " />}

              {fileName === '' ? (
                <span className="text-xxs">{inputLabel || 'Enviar anexo'}</span>
              ) : (
                <span className="text-xxs">{fileName}</span>
              )}
            </div>
          </FormLabel>
          <FormControl>
            <Input
              onChange={(event) => {
                handleChange(event)
                onChange(event)
              }}
              name={name}
              onBlur={onBlur}
              ref={ref}
              value={undefined}
              className="hidden"
              type={'file'}
              defaultValue={''}
            />
          </FormControl>

          <FormDescription>{description}</FormDescription>
          <FormMessage title={label} />
        </FormItem>
      )}
    />
  )
}
