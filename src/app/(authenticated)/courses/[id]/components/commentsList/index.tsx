'use client'
import { MoreVertical } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  commentItemQueryService,
  commentQueryService,
} from '../../services/comment'
import Comment, { CommentItem } from '@/types/Comment'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useClassContext } from '../../context/ClassesContext'

export interface CommentsListProps {
  token: string
  username: string | undefined
  usernameId: number
}

const CommentsList = ({ token, username, usernameId }: CommentsListProps) => {
  const { selectedClass } = useClassContext()
  const [commentFieldValue, setCommentFieldValue] = useState<string>('')
  const [selectedComment, setSelectedComment] = useState<CommentItem | null>(
    null,
  )
  const { data: dataComment } = commentItemQueryService.useFindAll(token)
  const { mutateAsync: deleteComment } = commentQueryService.useDelete(token)
  const { mutateAsync: createComment } =
    commentItemQueryService.useCreate(token)
  const { mutateAsync: updateComment } =
    commentItemQueryService.useUpdate(token)
  const initalsName = username?.split(' ') as string[]

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
          aula: selectedClass?.id,
        })
      }
    }
    resetComment()
  }

  const selectCommentToEdit = (comment: CommentItem) => {
    setSelectedComment(comment)
    setCommentFieldValue(comment.texto)
  }

  const resetComment = () => {
    setSelectedComment(null)
    setCommentFieldValue('')
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
        />
        <Button
          className="self-end py-2 px-4 mt-3 mb-7 !text-xxs font-medium"
          onClick={() => sendComment()}
          disabled={!commentFieldValue}
        >
          Salvar
        </Button>
      </div>
      {dataComment?.results?.map((comment: CommentItem) => {
        return (
          comment.aula === selectedClass?.id && (
            <div key={comment.id} className="flex items-start mb-5">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>
                  {initalsName[0].charAt(0).toUpperCase()}
                  {initalsName[1]?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="bg-white flex w-full justify-between p-3 rounded border-xxs border-border ml-3">
                <div>
                  <h3 className="text-black-1 font-medium text-xxs">
                    {username}
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
        )
      })}
    </div>
  )
}

export default CommentsList
