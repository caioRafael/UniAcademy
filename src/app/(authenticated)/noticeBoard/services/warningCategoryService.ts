import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { Category } from '@/types/Category'
import { ListResponse } from '@/types/ListResponse'

export class WarningCategoryService
  implements ResourceService<Category, Category>
{
  baseApi: IBaseApi<Category, Category>

  constructor(baseApi: IBaseApi<Category, Category>) {
    this.baseApi = baseApi
  }

  async create(): Promise<Category | null> {
    throw new Error('Method not implemented.')
  }

  findQuery(): Promise<Category[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<ListResponse<Category>> {
    const response = await this.baseApi.getAll('/api/categoria-aviso/', token)

    return response.data as ListResponse<Category>
  }

  async findOne(): Promise<Category | null> {
    throw new Error('Method not implemented.')
  }

  async update(): Promise<Category | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<Category | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<Category | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: Category): Category {
    return executionTest
  }

  commandToQuery(executionTest: Category): Category {
    return executionTest
  }
}
