'use client'

import { Accordion } from '@/components/ui/accordion'
import { ModuleItem } from './ModuleItem'
import { useEffect } from 'react'
import { Plus } from 'lucide-react'
import { useCourseContext } from '../context/CourseContext'
import { ModuleItem as Module } from '@/types/Module'

const initialModule: Module = {
  localId: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
  titulo: '',
  descricao: '',
  aulas: [],
}

export function ModulesContainer() {
  const { setModuleList, moduleList } = useCourseContext()

  useEffect(() => {
    setModuleList([initialModule])
  }, [setModuleList])

  const addNewModule = () => {
    setModuleList([
      ...moduleList,
      {
        ...initialModule,
        localId: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
      },
    ])
  }
  return (
    <div className="w-full flex flex-col items-center">
      <Accordion type="single" collapsible className="w-2/3">
        {moduleList.map((module, index) => (
          <ModuleItem
            key={index}
            module={module}
            setModuleList={setModuleList}
            moduleList={moduleList}
            index={index}
          />
        ))}
      </Accordion>
      <div
        onClick={addNewModule}
        className="border-2 mt-4 w-2/3 h-16 flex text-xs rounded-md aspect-video items-center justify-center cursor-pointer border-dashed gap-2 text-muted-foreground hover:bg-primary/5"
      >
        <Plus />
        Adicionar modulo
      </div>
    </div>
  )
}
