'use client'
import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CommentItem } from '@/types/Comment'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useClassContext } from '../../context/ClassesContext'
import { commentItemQueryService } from '../../services'
export interface CommentsListProps {
  token: string
  usernameId: number
}

const CommentsList = ({ token, usernameId }: CommentsListProps) => {
  const { selectedClass } = useClassContext()
  const [commentFieldValue, setCommentFieldValue] = useState<string>('')
  const [selectedComment, setSelectedComment] = useState<CommentItem | null>(
    null,
  )
  const [currentPage, setCurrentPage] = useState<number>(0)
  const displayCurrentPage = currentPage / 10 + 1
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  const { data: dataComment, isLoading } = commentItemQueryService.useFindAll(
    token,
    currentPage,
    selectedClass?.id,
  )

  const { mutateAsync: deleteComment } =
    commentItemQueryService.useDelete(token)

  const { mutateAsync: createComment } =
    commentItemQueryService.useCreate(token)

  const { mutateAsync: updateComment } =
    commentItemQueryService.useUpdate(token)

  useEffect(() => {
    setCurrentPage(0)
  }, [selectedClass])

  const totalPages = useMemo(() => {
    if (dataComment?.count === 0) {
      return 1
    }

    return Math.ceil(Number(dataComment?.count) / 10)
  }, [dataComment])

  const sendComment = async () => {
    if (selectedComment) {
      await updateComment({
        ...selectedComment,
        texto: commentFieldValue,
      })
    } else {
      if (selectedClass) {
        await createComment({
          texto: commentFieldValue,
          usuario: usernameId,
          aula: selectedClass?.id as number,
        } as CommentItem)
      }
    }
    resetComment()
  }

  const selectCommentToEdit = (comment: CommentItem) => {
    setSelectedComment(comment)
    setCommentFieldValue(comment.texto)
    document?.getElementById('comment-textarea')?.scrollIntoView({
      behavior: 'smooth',
    })
    inputRef.current && inputRef.current.focus()
  }

  const resetComment = () => {
    setSelectedComment(null)
    setCommentFieldValue('')
  }

  const getProfilePicture = (name: string) => {
    const initalsName = name?.split(' ') as string[]

    return (
      <AvatarFallback>
        {initalsName?.[0]?.charAt(0).toUpperCase()}
        {initalsName?.[1]?.charAt(0).toUpperCase()}
      </AvatarFallback>
    )
  }

  return (
    <div>
      <div className="flex flex-col">
        <h3 className="text-black font-medium text-xs mb-2">
          Faça seu comentário
        </h3>
        <textarea
          value={commentFieldValue}
          onChange={(e) => setCommentFieldValue(e.target.value)}
          className="rounded border-xxs border-border h-20 min-h-20 pl-1"
          ref={inputRef}
          id="comment-textarea"
        />
        <Button
          className="self-end py-2 px-4 mt-3 mb-7 !text-xxs font-medium"
          onClick={() => sendComment()}
          disabled={!commentFieldValue}
        >
          Salvar
        </Button>
      </div>
      {!isLoading &&
        dataComment?.results?.map((comment: CommentItem) => {
          return (
            <div key={comment.id} className="flex items-start mb-5">
              <Avatar>
                <AvatarImage src="" />
                {getProfilePicture(comment.nome_usuario)}
              </Avatar>
              <div className="bg-white flex w-full justify-between p-3 rounded border-xxs border-border ml-3">
                <div>
                  <h3 className="text-black-1 font-medium text-xxs">
                    {comment.nome_usuario}
                  </h3>
                  <p className="text-black-1 font-normal text-xxs">
                    {comment.texto}
                  </p>
                </div>
                <Popover>
                  <PopoverTrigger>
                    <MoreVertical className="self-start cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col border-2 w-28 gap-6 h-28">
                    <span
                      className="cursor-pointer"
                      onClick={() => selectCommentToEdit(comment)}
                    >
                      Editar
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={async () =>
                        await deleteComment(String(comment.id))
                      }
                    >
                      Excluir
                    </span>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )
        })}
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
              disabled={!dataComment?.previous}
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
              disabled={!dataComment?.next}
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

export default CommentsList
