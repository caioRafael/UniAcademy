import { BaseApi } from '@/lib/api/BaseApi'
import { Course } from '@/types/Course'
import { CourseService } from './courseService'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'

const baseApi = new BaseApi<Course, Course>()
export const courseService = new CourseService(baseApi)
export const courseQueryService = new ResourceQueryService(
  'course',
  courseService,
)
