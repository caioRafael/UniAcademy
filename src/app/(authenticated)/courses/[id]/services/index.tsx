import { BaseApi } from '@/lib/api/BaseApi'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'
import { AnnotationItem } from '@/types/Annotation'
import { AnnotationService } from './annotationService'
import { CommentItem } from '@/types/Comment'
import { CommentService } from './commentService'
import { FavoriteItem } from '@/types/Favorite'
import { FavoriteService } from './favoriteService'
import { ClipItem } from '@/types/Clip'
import { ClipService } from './clipService'
import { FinalProject } from '@/types/FinalProject'
import { FinalProjectService } from './finalProject'

const annotationItemBaseApi = new BaseApi<AnnotationItem, AnnotationItem>()
export const annotationItemService = new AnnotationService(
  annotationItemBaseApi,
)
export const annotationItemQueryService = new ResourceQueryService(
  'annotation',
  annotationItemService,
)

const commentItemBaseApi = new BaseApi<CommentItem, CommentItem>()
export const commentItemService = new CommentService(commentItemBaseApi)
export const commentItemQueryService = new ResourceQueryService(
  'comment',
  commentItemService,
)

const clipItemBaseApi = new BaseApi<ClipItem, ClipItem>()
export const clipItemService = new ClipService(clipItemBaseApi)
export const clipItemQueryService = new ResourceQueryService(
  'clip',
  clipItemService,
)

const favoriteItemBaseApi = new BaseApi<FavoriteItem, FavoriteItem>()
export const favoriteItemService = new FavoriteService(favoriteItemBaseApi)
export const favoriteItemQueryService = new ResourceQueryService(
  'favorite',
  favoriteItemService,
)

const finalProjectBaseApi = new BaseApi<FinalProject, FinalProject>()
export const finalProjectService = new FinalProjectService(finalProjectBaseApi)
export const finalProjectQueryService = new ResourceQueryService(
  'finalProject',
  finalProjectService,
)
