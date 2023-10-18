import Annotation, { AnnotationItem } from '@/types/Annotation'
import {
  annotationItemQueryService,
  annotationQueryService,
} from '../../services/annotations'
import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { MoreVertical } from 'lucide-react'
import { useClassContext } from '../../context/ClassesContext'
export interface AnnotationsProps {
  token: string
  usernameId: number
}

export const Annotations = ({ token, usernameId }: AnnotationsProps) => {
  const { selectedClass } = useClassContext()
  const [annotationFieldValue, setAnnotationFieldValue] = useState<string>('')
  const [selectedAnnotation, setSelectedAnnotation] =
    useState<AnnotationItem | null>(null)
  const { data, isLoading } = annotationQueryService.useFindAll(token)
  const dataAnnotation = data as Annotation

  const { mutateAsync: deleteAnnotation } =
    annotationQueryService.useDelete(token)

  const { mutateAsync: createAnnotation } =
    annotationItemQueryService.useCreate(token)

  const { mutateAsync: updateAnnotation } =
    annotationItemQueryService.useUpdate(token)

  const sendAnnotation = async () => {
    if (selectedAnnotation) {
      await updateAnnotation({
        ...selectedAnnotation,
        anotacao: annotationFieldValue,
      })
    } else {
      if (selectedClass) {
        await createAnnotation({
          anotacao: annotationFieldValue,
          usuario_criacao: usernameId,
          aula: selectedClass?.id,
        })
      }
    }
    resetAnnotation()
  }

  const selectAnnotationToEdit = (annotation: AnnotationItem) => {
    setSelectedAnnotation(annotation)
    setAnnotationFieldValue(annotation.anotacao)
  }

  const resetAnnotation = () => {
    setSelectedAnnotation(null)
    setAnnotationFieldValue('')
  }

  const hasItemsPerClass = () => {
    return dataAnnotation?.results.some(
      (annotation) => annotation?.aula === selectedClass?.id,
    )
  }

  return (
    <div>
      <div className="flex flex-col">
        <h3 className="text-black font-medium text-xs mb-2">
          Faça sua anotação
        </h3>
        <textarea
          value={annotationFieldValue}
          onChange={(e) => setAnnotationFieldValue(e.target.value)}
          className="rounded border-xxs border-border h-20 min-h-20 pl-1"
        />
        <button
          className="self-end bg-oxfordBlue text-white rounded-md py-2 px-4 mt-3 text-xxs font-medium  mb-7"
          disabled={!annotationFieldValue}
          onClick={() => sendAnnotation()}
        >
          Salvar
        </button>
      </div>
      <div className="mt-7">
        {hasItemsPerClass() && (
          <h3 className="text-black font-medium text-xs mb-2">
            Suas anotações
          </h3>
        )}
        {dataAnnotation?.results?.map((annotation: AnnotationItem) => {
          return (
            annotation.aula === selectedClass?.id && (
              <div
                key={annotation.id}
                className="bg-white mb-5 p-3 rounded border-xxs border-border flex justify-between"
              >
                <p className="text-black-1 text-xxs font-normal">
                  {annotation.anotacao}
                </p>
                <Popover>
                  <PopoverTrigger>
                    <MoreVertical className="self-start cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col border-2 w-28 gap-6 h-28">
                    <span
                      className="cursor-pointer"
                      onClick={() => selectAnnotationToEdit(annotation)}
                    >
                      Editar
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={async () =>
                        await deleteAnnotation(String(annotation.id))
                      }
                    >
                      Excluir
                    </span>
                  </PopoverContent>
                </Popover>
              </div>
            )
          )
        })}
      </div>
    </div>
  )
}

export default Annotations
