import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { Recommended } from '@/types/Recommended'
import { ListResponse } from '@/types/ListResponse'

export class RecommendedService
  implements ResourceService<Recommended, Recommended>
{
  baseApi: IBaseApi<Recommended, Recommended>

  constructor(baseApi: IBaseApi<Recommended, Recommended>) {
    this.baseApi = baseApi
  }

  async create(): Promise<Recommended | null> {
    throw new Error('Method not implemented.')
  }

  findQuery(): Promise<Recommended[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<ListResponse<Recommended>> {
    const response = await this.baseApi.getAll(
      '/api/recomendacoes/?limit=6',
      token,
    )

    return response.data
  }

  async findOne(id: string, token: string): Promise<Recommended | null> {
    const response = await this.baseApi.getOne(
      `/api/recomendacoes/${id}`,
      token,
    )

    return response.data as Recommended
  }

  async update(): Promise<Recommended | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<Recommended | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<Recommended | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: Recommended): Recommended {
    return executionTest
  }

  commandToQuery(executionTest: Recommended): Recommended {
    return executionTest
  }
}
