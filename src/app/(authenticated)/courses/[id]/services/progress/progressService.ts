import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { ListResponse } from '@/types/ListResponse'
import Progress from '@/types/Progress'

export class ProgressService implements ResourceService<Progress, Progress> {
  baseApi: IBaseApi<Progress, Progress>

  constructor(baseApi: IBaseApi<Progress, Progress>) {
    this.baseApi = baseApi
  }

  async create(data: Progress, token: string): Promise<Progress | null> {
    const response = await this.baseApi.post('/api/progresso/', data, token)

    return response.data as Progress
  }

  findQuery(): Promise<Progress[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(): Promise<ListResponse<Progress>> {
    throw new Error('Method not implemented.')
  }

  async findOne(): Promise<Progress | null> {
    throw new Error('Method not implemented.')
  }

  async update(): Promise<Progress | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<Progress | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<Progress | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: Progress): Progress {
    return executionTest
  }

  commandToQuery(executionTest: Progress): Progress {
    return executionTest
  }
}
