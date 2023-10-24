import { BaseApi } from '@/lib/api/BaseApi'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'
import { RankingService } from './rankingService'
import { Ranking } from '@/types/Ranking'

const rankingBaseApi = new BaseApi<Ranking, Ranking>()
export const rankingService = new RankingService(rankingBaseApi)
export const rankingQueryService = new ResourceQueryService(
  'ranking',
  rankingService,
)
