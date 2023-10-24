import { BaseApi } from '@/lib/api/BaseApi'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'
import { RecommendedService } from './recommendedService'
import { Recommended } from '@/types/Recommended'

const recommendedBaseApi = new BaseApi<Recommended, Recommended>()
export const recommendedService = new RecommendedService(recommendedBaseApi)
export const recommendedQueryService = new ResourceQueryService(
  'recommended',
  recommendedService,
)
