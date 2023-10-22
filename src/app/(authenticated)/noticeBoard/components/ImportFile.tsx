'use client'

import { File } from 'lucide-react'
import { ChangeEvent } from 'react'

interface ImportFileProps {
  file: File | null
  setFile: (file: File | null) => void
}

export function ImportFile(props: ImportFileProps) {
  const { file, setFile } = props
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
    }
  }
  return (
    <>
      <input
        type="file"
        id="image"
        className="sr-only"
        onChange={handleFileChange}
      />
      <label
        htmlFor="image"
        className="border-2 w-full h-16 flex text-xs rounded-md aspect-video items-center justify-center cursor-pointer border-dashed gap-2 text-muted-foreground hover:bg-primary/5"
      >
        <File />
        {file ? file.name : 'Enviar anexos'}
      </label>
    </>
  )
}
