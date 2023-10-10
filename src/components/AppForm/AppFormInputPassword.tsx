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
import { Button } from '../ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface AppFormInputPasswordProps {
  label: string
  name: string
  form: UseFormReturn | undefined
  placeholder?: string
  description?: string
  required?: boolean
}

export function AppFormInputPassword(props: AppFormInputPasswordProps) {
  const { label, name, form, placeholder, description, required } = props
  const [type, setType] = useState<'password' | 'text'>('password')

  const alterType = () => {
    if (type === 'password') {
      setType('text')
    } else {
      setType('password')
    }
  }

  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-xs">
            {label} {required && <span className="text-darkRed">*</span>}
          </FormLabel>
          <FormControl>
            <div className="flex items-center justify-center px-0 p-1 h-10 w-full rounded-md border border-border bg-white py-2 text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-muted-foreground placeholder:text-xs focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden">
              <Input
                placeholder={placeholder}
                {...field}
                type={type}
                className="border-none bg-none"
              />
              <Button variant={'link'} onClick={alterType}>
                {type === 'password' ? <Eye /> : <EyeOff />}
              </Button>
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage title={label} />
        </FormItem>
      )}
    />
  )
}
