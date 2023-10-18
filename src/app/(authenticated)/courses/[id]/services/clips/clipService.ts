import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { ClipItem } from '@/types/Clip'

export class ClipService implements ResourceService<ClipItem, ClipItem> {
  baseApi: IBaseApi<ClipItem, ClipItem>

  constructor(baseApi: IBaseApi<ClipItem, ClipItem>) {
    this.baseApi = baseApi
  }

  async create(): Promise<ClipItem | null> {
    throw new Error('Method not implemented.')
  }

  findQuery(): Promise<ClipItem[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<ClipItem> {
    const response = await this.baseApi.getAll(`/api/clipes/`, token)

    return response.data as ClipItem
  }

  async findOne(id: string, token: string): Promise<ClipItem | null> {
    const response = await this.baseApi.getOne(`/api/clipes/${id}`, token)

    return response.data as ClipItem
  }

  async update(): Promise<ClipItem | null> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string, token: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<ClipItem | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<ClipItem | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: ClipItem): ClipItem {
    return executionTest
  }

  commandToQuery(executionTest: ClipItem): ClipItem {
    return executionTest
  }
}
