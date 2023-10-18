import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import Clip from '@/types/Clip'

export class ClipesService implements ResourceService<Clip, Clip> {
  baseApi: IBaseApi<Clip, Clip>

  constructor(baseApi: IBaseApi<Clip, Clip>) {
    this.baseApi = baseApi
  }

  async create(): Promise<Clip | null> {
    throw new Error('Method not implemented.')
  }

  findQuery(): Promise<Clip[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<Clip> {
    const response = await this.baseApi.getAll(`/api/clipes/`, token)

    return response.data as Clip
  }

  async findOne(id: string, token: string): Promise<Clip | null> {
    const response = await this.baseApi.getOne(`/api/clipes/${id}`, token)

    return response.data as Clip
  }

  async update(): Promise<Clip | null> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string, token: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<Clip | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<Clip | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: Clip): Clip {
    return executionTest
  }

  commandToQuery(executionTest: Clip): Clip {
    return executionTest
  }
}
