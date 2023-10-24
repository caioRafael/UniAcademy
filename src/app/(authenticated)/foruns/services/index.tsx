import { BaseApi } from '@/lib/api/BaseApi'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'
import { ForumItem } from '@/types/Forum'
import { ForumService } from './forumService'
import { CreateForumAnswerService } from './createForumAnswerService'
import CreateForumAnswer from '@/types/CreateForumAnswer'
import { ForumAnswersService } from './forumAnswersService'
import { ForumAnswerItem } from '@/types/ForumAnswers'

const forumItemBaseApi = new BaseApi<ForumItem, ForumItem>()
export const forumItemService = new ForumService(forumItemBaseApi)
export const forumItemQueryService = new ResourceQueryService(
  'forum',
  forumItemService,
)

const createForumAnswerBaseApi = new BaseApi<
  CreateForumAnswer,
  CreateForumAnswer
>()
export const createForumAnswerService = new CreateForumAnswerService(
  createForumAnswerBaseApi,
)
export const createForumAnswerQueryService = new ResourceQueryService(
  'createForumAnswer',
  createForumAnswerService,
)

const forumAnswersBaseApi = new BaseApi<ForumAnswerItem, ForumAnswerItem>()
export const forumAnswersService = new ForumAnswersService(forumAnswersBaseApi)
export const forumAnswersQueryService = new ResourceQueryService(
  'forum',
  forumAnswersService,
)
