import { BaseApi } from '@/lib/api/BaseApi'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'
import Clip, { ClipItem } from '@/types/Clip'
import { ClipService } from './clipService'
import { ClipesService } from './clipsService'

const clipBaseApi = new BaseApi<Clip, Clip>()
export const clipService = new ClipesService(clipBaseApi)
export const clipQueryService = new ResourceQueryService('clips', clipService)

const clipItemBaseApi = new BaseApi<ClipItem, ClipItem>()
export const clipItemService = new ClipService(clipItemBaseApi)
export const clipItemQueryService = new ResourceQueryService(
  'clip',
  clipItemService,
)
