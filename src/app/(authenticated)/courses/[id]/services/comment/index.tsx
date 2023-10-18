import { BaseApi } from '@/lib/api/BaseApi'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'
import { CommentsService } from './commentsService'
import Comment, { CommentItem } from '@/types/Comment'
import { CommentService } from './commentService'

const commentBaseApi = new BaseApi<Comment, Comment>()
export const commentService = new CommentsService(commentBaseApi)
export const commentQueryService = new ResourceQueryService(
  'comments',
  commentService,
)

const commentItemBaseApi = new BaseApi<CommentItem, CommentItem>()
export const commentItemService = new CommentService(commentItemBaseApi)
export const commentItemQueryService = new ResourceQueryService(
  'comment',
  commentItemService,
)
