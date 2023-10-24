import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { Ranking } from '@/types/Ranking'
import { ListResponse } from '@/types/ListResponse'

export class RankingService implements ResourceService<Ranking, Ranking> {
  baseApi: IBaseApi<Ranking, Ranking>

  constructor(baseApi: IBaseApi<Ranking, Ranking>) {
    this.baseApi = baseApi
  }

  async create(): Promise<Ranking | null> {
    throw new Error('Method not implemented.')
  }

  findQuery(): Promise<Ranking[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<ListResponse<Ranking>> {
    const response = await this.baseApi.getAll('/api/ranking/', token)

    return response.data
  }

  async findOne(id: string, token: string): Promise<Ranking | null> {
    const response = await this.baseApi.getOne(`/api/ranking/${id}`, token)

    return response.data as Ranking
  }

  async update(): Promise<Ranking | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<Ranking | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<Ranking | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: Ranking): Ranking {
    return executionTest
  }

  commandToQuery(executionTest: Ranking): Ranking {
    return executionTest
  }
}
