import { BaseApi } from '@/lib/api/BaseApi'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'
import { GraduationService } from './graduationService'
import { GraduationsService } from './graduationsService'
import Graduation, { GraduationItem } from '@/types/Graduation'

const graduationBaseApi = new BaseApi<Graduation, Graduation>()
export const graduationService = new GraduationsService(graduationBaseApi)
export const graduationQueryService = new ResourceQueryService(
  'graduations',
  graduationService,
)

const graduationItemBaseApi = new BaseApi<GraduationItem, GraduationItem>()
export const graduationItemService = new GraduationService(
  graduationItemBaseApi,
)
export const graduationItemQueryService = new ResourceQueryService(
  'graduation',
  graduationItemService,
)
