import { BaseApi } from '@/lib/api/BaseApi'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'
import Forum, { ForumItem } from '@/types/Forum'
import { ForunsService } from './forunsService'
import { ForumService } from './forumService'

const forumBaseApi = new BaseApi<Forum, Forum>()
export const forumService = new ForunsService(forumBaseApi)
export const forumQueryService = new ResourceQueryService(
  'foruns',
  forumService,
)

const forumItemBaseApi = new BaseApi<ForumItem, ForumItem>()
export const forumItemService = new ForumService(forumItemBaseApi)
export const forumItemQueryService = new ResourceQueryService(
  'forum',
  forumItemService,
)
