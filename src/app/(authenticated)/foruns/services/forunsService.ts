import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import Forum from '@/types/Forum'

export class ForunsService implements ResourceService<Forum, Forum> {
  baseApi: IBaseApi<Forum, Forum>

  constructor(baseApi: IBaseApi<Forum, Forum>) {
    this.baseApi = baseApi
  }

  async create(): Promise<Forum | null> {
    throw new Error('Method not implemented.')
  }

  findQuery(): Promise<Forum[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<Forum> {
    const response = await this.baseApi.getAll(`/api/foruns/`, token)

    return response.data as Forum
  }

  async findOne(id: string, token: string): Promise<Forum | null> {
    const response = await this.baseApi.getOne(`/api/foruns/${id}`, token)

    return response.data as Forum
  }

  async update(): Promise<Forum | null> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string, token: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<Forum | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<Forum | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: Forum): Forum {
    return executionTest
  }

  commandToQuery(executionTest: Forum): Forum {
    return executionTest
  }
}
