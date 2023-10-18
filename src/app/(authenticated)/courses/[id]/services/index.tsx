import { BaseApi } from '@/lib/api/BaseApi'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'
import { ClassService } from './classService'
import { ClassItem } from '@/types/Class'

const classItemBaseApi = new BaseApi<ClassItem, ClassItem>()
export const classItemService = new ClassService(classItemBaseApi)
export const classItemQueryService = new ResourceQueryService(
  'class',
  classItemService,
)
