'use client'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { VideoContainer } from './VideoContainer'
import { UploadVideo } from '@/components/UploadVideo'
import { ModuleItem } from '@/types/Module'

interface ModuleItemProps {
  module: ModuleItem
  moduleList: ModuleItem[]
  setModuleList: (moduleList: ModuleItem[]) => void
  index: number
}

export function ModuleItem(props: ModuleItemProps) {
  const { module, setModuleList, moduleList, index } = props
  const [title, setTitle] = useState<string>(module.titulo)
  const [videoList, setVideoList] = useState<File[]>(module.aulas || [])

  const handleNewVideo = (file: File) => {
    setVideoList([...videoList, file])
  }

  useEffect(() => {
    const alterModuleList: ModuleItem[] = moduleList.map(
      (currentModule, currentIndex) => {
        if (index === currentIndex) {
          return {
            titulo: title,
            descricao: '',
            aulas: videoList,
          } as ModuleItem
        } else {
          return currentModule
        }
      },
    )

    setModuleList(alterModuleList)
  }, [title, videoList])

  return (
    <AccordionItem value={String(index)}>
      <AccordionTrigger>
        <Input
          placeholder="Título do módulo"
          onChange={(e) => setTitle(e.currentTarget.value)}
          className="w-5/6"
        />
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col w-full gap-1">
          {module.aulas?.map((video, indexVideo) => (
            <VideoContainer video={video} key={indexVideo} />
          ))}
          <UploadVideo newVideo={handleNewVideo} />
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
