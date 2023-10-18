import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { GraduationItem } from '@/types/Graduation'
import { ListResponse } from '@/types/ListResponse'

export class GraduationService
  implements ResourceService<GraduationItem, GraduationItem>
{
  baseApi: IBaseApi<GraduationItem, GraduationItem>

  constructor(baseApi: IBaseApi<GraduationItem, GraduationItem>) {
    this.baseApi = baseApi
  }

  async create(): Promise<GraduationItem | null> {
    throw new Error('Method not implemented.')
  }

  findQuery(): Promise<GraduationItem[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<ListResponse<GraduationItem>> {
    const response = await this.baseApi.getAll('/api/categoria-curso/', token)

    return response.data as ListResponse<GraduationItem>
  }

  async findOne(id: string, token: string): Promise<GraduationItem | null> {
    const response = await this.baseApi.getOne(
      `/api/categoria-curso/${id}`,
      token,
    )

    return response.data as GraduationItem
  }

  async update(): Promise<GraduationItem | null> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string, token: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<GraduationItem | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<GraduationItem | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: GraduationItem): GraduationItem {
    return executionTest
  }

  commandToQuery(executionTest: GraduationItem): GraduationItem {
    return executionTest
  }
}
