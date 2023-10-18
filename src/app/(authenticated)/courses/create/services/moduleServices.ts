import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { ListResponse } from '@/types/ListResponse'
import { ModuleItem } from '@/types/Module'

export class ModuleService implements ResourceService<ModuleItem, ModuleItem> {
  baseApi: IBaseApi<ModuleItem, ModuleItem>

  constructor(baseApi: IBaseApi<ModuleItem, ModuleItem>) {
    this.baseApi = baseApi
  }

  async create(data: ModuleItem, token: string): Promise<ModuleItem | null> {
    const response = await this.baseApi.post(
      '/api/modulo/',
      data,
      token as string,
    )

    return response.data as ModuleItem
  }

  findQuery(): Promise<ModuleItem[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(
    token: string,
    course: number,
  ): Promise<ListResponse<ModuleItem>> {
    const response = await this.baseApi.getAll(
      `/api/modulo/?curso=${course}`,
      token,
    )
    return response.data as ListResponse<ModuleItem>
  }

  async findOne(id: string, token: string): Promise<ModuleItem | null> {
    const response = await this.baseApi.getOne(`/api/modulo/${id}`, token)

    return response.data
  }

  async update(): Promise<ModuleItem | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<ModuleItem | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<ModuleItem | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: ModuleItem): ModuleItem {
    return executionTest
  }

  commandToQuery(executionTest: ModuleItem): ModuleItem {
    return executionTest
  }
}
