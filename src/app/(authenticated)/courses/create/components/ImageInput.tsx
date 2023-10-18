'use client'

import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { ChangeEvent } from 'react'
import { useCourseContext } from '../context/CourseContext'

export function ImageInput() {
  const { capa, setCapa } = useCourseContext()

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCapa(file)
    }
  }
  return (
    <>
      {!capa && (
        <>
          <input
            type="file"
            id="image"
            className="sr-only"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="border-2 w-full h-16 flex text-xs rounded-md aspect-video items-center justify-center cursor-pointer border-dashed gap-2 text-muted-foreground hover:bg-primary/5"
          >
            <Plus />
            Selecione a capa do curso
          </label>
        </>
      )}

      {capa && (
        <div className="flex w-full h-80 relative">
          <Button
            variant={'secondary'}
            className="absolute top-1 right-1 text-white"
            onClick={() => setCapa(null)}
          >
            <Trash2 />
          </Button>
          <Image
            src={URL.createObjectURL(capa)}
            alt="Preview"
            width={200}
            height={200}
            className="w-full h-80 object-cover rounded-md"
          />
        </div>
      )}
    </>
  )
}
