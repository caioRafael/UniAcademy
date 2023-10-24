import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { ClipItem } from '@/types/Clip'
import { ListResponse } from '@/types/ListResponse'

export class ClipService implements ResourceService<ClipItem, ClipItem> {
  baseApi: IBaseApi<ClipItem, ClipItem>

  constructor(baseApi: IBaseApi<ClipItem, ClipItem>) {
    this.baseApi = baseApi
  }

  async create(data: ClipItem, token: string): Promise<ClipItem | null> {
    const response = await this.baseApi.post('/api/clipes/', data, token)

    return response.data as ClipItem
  }

  findQuery(): Promise<ClipItem[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(
    token: string,
    userId: number,
    classId: number,
  ): Promise<ListResponse<ClipItem>> {
    const response = await this.baseApi.getAll(
      `/api/clipes/?usuario_criacao=${userId}&aula=${classId}`,
      token,
    )

    return response.data as ListResponse<ClipItem>
  }

  async findOne(id: string, token: string): Promise<ClipItem | null> {
    const response = await this.baseApi.getOne(`/api/clipes/${id}`, token)

    return response.data as ClipItem
  }

  async update(): Promise<ClipItem | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
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
