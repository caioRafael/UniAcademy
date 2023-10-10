import { Textarea, TextareaProps } from '@/components/ui/textarea'
import useAutosizeTextArea from '@/hooks/useAutoSize'
import React from 'react'

export interface ITextareaProps extends TextareaProps {
  onValueChange?(value: string): void
}

export function TextAreaAutoSize(props: ITextareaProps) {
  const [value, setValue] = React.useState('')
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null)

  useAutosizeTextArea(textAreaRef.current, value)

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value

    setValue(val)
    if (props.onValueChange) props.onValueChange(val)
  }

  return (
    <Textarea
      onChange={handleChange}
      ref={textAreaRef}
      value={value}
      rows={1}
      {...props}
    />
  )
}
