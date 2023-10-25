'use client'

import { Plus } from 'lucide-react'
import { ChangeEvent } from 'react'

interface UploadVideoProps {
  newVideo: (file: File) => void
}

export function UploadVideo(props: UploadVideoProps) {
  const { newVideo } = props

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedVideo = e.target.files?.[0]
    if (selectedVideo) {
      newVideo(selectedVideo)
    }
  }

  return (
    <>
      <input
        type="file"
        id="video"
        accept="video/*"
        className="sr-only"
        onChange={handleVideoChange}
      />
      <label
        htmlFor="video"
        className="border-2 w-full h-16 flex text-xs rounded-md aspect-video items-center justify-center cursor-pointer border-dashed gap-2 text-muted-foreground hover:bg-primary/5"
      >
        <Plus />
        Adicionar conteúdo
      </label>
    </>
  )
}
