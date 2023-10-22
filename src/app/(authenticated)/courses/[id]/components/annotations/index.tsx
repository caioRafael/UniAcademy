import { AnnotationItem } from '@/types/Annotation'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react'
import { useClassContext } from '../../context/ClassesContext'
import { annotationItemQueryService } from '../../services'
export interface AnnotationsProps {
  token: string
  usernameId: number
}

export const Annotations = ({ token, usernameId }: AnnotationsProps) => {
  const { selectedClass } = useClassContext()
  const [annotationFieldValue, setAnnotationFieldValue] = useState<string>('')
  const [selectedAnnotation, setSelectedAnnotation] =
    useState<AnnotationItem | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const displayCurrentPage = currentPage / 10 + 1
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  const { data: dataAnnotation, isLoading } =
    annotationItemQueryService.useFindAll(token, currentPage, selectedClass?.id)

  const { mutateAsync: deleteAnnotation } =
    annotationItemQueryService.useDelete(token)

  const { mutateAsync: createAnnotation } =
    annotationItemQueryService.useCreate(token)

  const { mutateAsync: updateAnnotation } =
    annotationItemQueryService.useUpdate(token)

  useEffect(() => {
    setCurrentPage(0)
  }, [selectedAnnotation])

  const totalPages = useMemo(() => {
    if (dataAnnotation?.count === 0) {
      return 1
    }
    return Math.ceil(Number(dataAnnotation?.count) / 10)
  }, [dataAnnotation])

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
          aula: selectedClass?.id as number,
        })
      }
    }
    resetAnnotation()
  }

  const selectAnnotationToEdit = (annotation: AnnotationItem) => {
    setSelectedAnnotation(annotation)
    setAnnotationFieldValue(annotation.anotacao)
    document?.getElementById('annotation-textarea')?.scrollIntoView({
      behavior: 'smooth',
    })
    inputRef.current && inputRef.current.focus()
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
          ref={inputRef}
          id="annotation-textarea"
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
        })}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {!isLoading && (
          <>
            <span className="text-xxs">
              Página {displayCurrentPage} de {totalPages}
            </span>
            <button
              onClick={() => {
                setCurrentPage((value) => value - 10)
              }}
              disabled={!dataAnnotation?.previous}
            >
              <ChevronLeft
                width={24}
                height={24}
                className="text-black opacity-50"
              />
            </button>
            <button
              onClick={() => {
                setCurrentPage((value) => value + 10)
              }}
              disabled={!dataAnnotation?.next}
            >
              <ChevronRight
                width={24}
                height={24}
                className="text-black opacity-50"
              />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Annotations
