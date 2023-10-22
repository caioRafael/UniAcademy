import { BaseApi } from '@/lib/api/BaseApi'
import { NoticeBoardService } from './noticeBoardService'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'
import { Warning } from '@/types/Warning'
import { Category } from '@/types/Category'
import { WarningCategoryService } from './warningCategoryService'

const profileBaseApi = new BaseApi<Warning, Warning>()
export const noticeBoardService = new NoticeBoardService(profileBaseApi)
export const noticeBoardQueryService = new ResourceQueryService(
  'NoticeBoard',
  noticeBoardService,
)

const categoryBaseApi = new BaseApi<Category, Category>()
export const warningCategoryService = new WarningCategoryService(
  categoryBaseApi,
)
export const warningCategoryQueryService = new ResourceQueryService(
  'warningCategory',
  warningCategoryService,
)
