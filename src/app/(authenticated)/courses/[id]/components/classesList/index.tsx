'use client'

import ClassRoom from '@/types/Classroom'
import { useClassContext } from '../../context/ClassesContext'
import { AccordionContent } from '@/components/ui/accordion'
import { CheckCircle2, Play } from 'lucide-react'
import { classRoomQueryService } from '../../../create/services'

interface ClassesListProps {
  token: string
  moduleId: number
}

const ClassesList = ({ token, moduleId }: ClassesListProps) => {
  const { setSelectedClass } = useClassContext()
  const { data: dataClass } = classRoomQueryService.useFindAll(token, moduleId)
  return (
    <ul className="bg-darkGrey mb-3">
      {dataClass?.results?.map((moduleClass: ClassRoom) => (
        <AccordionContent key={moduleClass.id} className="bg-darkGrey mb-3">
          <li
            className="flex items-center gap-6 py-4 px-2 cursor-pointer pb-0"
            onClick={() => setSelectedClass(moduleClass)}
          >
            {moduleClass && moduleClass?.meu_progresso_read?.progresso < 90 ? (
              <Play className="text-white w-4" />
            ) : (
              <CheckCircle2 className="text-checkGreen" />
            )}
            <span className="text-white text-xxxs font-medium w-48 truncate">
              {moduleClass.titulo}
            </span>
          </li>
        </AccordionContent>
      ))}
    </ul>
  )
}

export default ClassesList
