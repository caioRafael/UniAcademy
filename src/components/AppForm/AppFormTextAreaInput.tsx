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
import { Textarea } from '../ui/textarea'

interface AppFormInputProps {
  label?: string
  name: string
  form: UseFormReturn | undefined
  placeholder?: string
  description?: string
  required?: boolean
  type: string
  maxLength?: number
}

export function AppFormTextAreaInput(props: AppFormInputProps) {
  const { label, name, form, placeholder, description, required, maxLength } =
    props

  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && (
            <FormLabel className="text-xxs">
              {label} {required && <span className="text-darkRed">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Textarea
              maxLength={maxLength}
              placeholder={placeholder}
              required={required}
              {...field}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage title={label} />
        </FormItem>
      )}
    />
  )
}
