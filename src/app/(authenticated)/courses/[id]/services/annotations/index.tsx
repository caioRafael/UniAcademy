import { BaseApi } from '@/lib/api/BaseApi'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'
import Annotation, { AnnotationItem } from '@/types/Annotation'
import { AnnotationsService } from './annotationsService'
import { AnnotationService } from './annotationService'

const annotationBaseApi = new BaseApi<Annotation, Annotation>()
export const annotationService = new AnnotationsService(annotationBaseApi)
export const annotationQueryService = new ResourceQueryService(
  'annotations',
  annotationService,
)

const annotationItemBaseApi = new BaseApi<AnnotationItem, AnnotationItem>()
export const annotationItemService = new AnnotationService(
  annotationItemBaseApi,
)
export const annotationItemQueryService = new ResourceQueryService(
  'annotation',
  annotationItemService,
)
