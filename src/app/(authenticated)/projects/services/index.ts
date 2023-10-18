import { BaseApi } from '@/lib/api/BaseApi'
import Project from '@/types/Project'
import { ProjectService } from './projectsServices'
import { ResourceQueryService } from '@/lib/api/ResourceQueryService'
import { Category } from '@/types/Category'
import { ProjectCategoryService } from './projectCategoryService'

const baseApi = new BaseApi<Project, Project>()
export const projectService = new ProjectService(baseApi)
export const projetctQueryService = new ResourceQueryService(
  'projetct',
  projectService,
)

const categoryBaseApi = new BaseApi<Category, Category>()
export const projectCategoryService = new ProjectCategoryService(
  categoryBaseApi,
)
export const projetctCategoryQueryService = new ResourceQueryService(
  'projectCategory',
  projectCategoryService,
)
