import { BaseApi } from '@/lib/api/BaseApi'
import { Course, CourseCategory } from '@/types/Course'
import { CourseService } from './courseService'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'
import { ModuleItem } from '@/types/Module'
import { ModuleService } from './moduleServices'
import ClassRoom from '@/types/Classroom'
import { ClassRoomService } from './classRoomService'
import { CourseCategoryService } from './courseCategoryService'

const baseApi = new BaseApi<Course, Course>()
export const courseService = new CourseService(baseApi)
export const courseQueryService = new ResourceQueryService(
  'course',
  courseService,
)

const moduleBaseApi = new BaseApi<ModuleItem, ModuleItem>()
export const moduleService = new ModuleService(moduleBaseApi)
export const moduleQueryService = new ResourceQueryService(
  'module',
  moduleService,
)

const classRoomBaseApi = new BaseApi<ClassRoom, ClassRoom>()
export const classRoomService = new ClassRoomService(classRoomBaseApi)
export const classRoomQueryService = new ResourceQueryService(
  'classRoom',
  classRoomService,
)

const categoryBaseApi = new BaseApi<CourseCategory, CourseCategory>()
export const courseCategoryService = new CourseCategoryService(categoryBaseApi)
export const courseCategoryQueryService = new ResourceQueryService(
  'courseCategory',
  courseCategoryService,
)
