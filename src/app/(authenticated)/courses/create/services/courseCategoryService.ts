import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { CourseCategory } from '@/types/Course'
import { ListResponse } from '@/types/ListResponse'

export class CourseCategoryService
  implements ResourceService<CourseCategory, CourseCategory>
{
  baseApi: IBaseApi<CourseCategory, CourseCategory>

  constructor(baseApi: IBaseApi<CourseCategory, CourseCategory>) {
    this.baseApi = baseApi
  }

  async create(): Promise<CourseCategory | null> {
    throw new Error('Method not implemented.')
  }

  findQuery(): Promise<CourseCategory[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<ListResponse<CourseCategory>> {
    const response = await this.baseApi.getAll('/api/categoria-curso/', token)

    return response.data as ListResponse<CourseCategory>
  }

  async findOne(): Promise<CourseCategory | null> {
    throw new Error('Method not implemented.')
  }

  async update(): Promise<CourseCategory | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<CourseCategory | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<CourseCategory | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: CourseCategory): CourseCategory {
    return executionTest
  }

  commandToQuery(executionTest: CourseCategory): CourseCategory {
    return executionTest
  }
}
