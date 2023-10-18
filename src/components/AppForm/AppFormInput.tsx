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

interface AppFormInputProps {
  label: string
  name: string
  form: UseFormReturn | undefined
  placeholder?: string
  description?: string
  required?: boolean
  type: string
  maxLength?: number
}

export function AppFormInput(props: AppFormInputProps) {
  const {
    label,
    name,
    form,
    placeholder,
    description,
    required,
    type,
    maxLength,
  } = props

  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-xxs">
            {label} {required && <span className="text-darkRed">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              maxLength={maxLength}
              placeholder={placeholder}
              {...field}
              type={type}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage title={label} />
        </FormItem>
      )}
    />
  )
}
