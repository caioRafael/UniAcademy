import { BaseApi } from '@/lib/api/BaseApi'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'
import { ProgressService } from './progressService'
import Progress from '@/types/Progress'

const progressBaseApi = new BaseApi<Progress, Progress>()
export const progressService = new ProgressService(progressBaseApi)
export const progressQueryService = new ResourceQueryService(
  'progresso',
  progressService,
  true,
)
