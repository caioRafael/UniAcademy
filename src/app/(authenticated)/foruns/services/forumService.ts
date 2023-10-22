import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { ForumItem } from '@/types/Forum'
import { ListResponse } from '@/types/ListResponse'

export class ForumService implements ResourceService<ForumItem, ForumItem> {
  baseApi: IBaseApi<ForumItem, ForumItem>

  constructor(baseApi: IBaseApi<ForumItem, ForumItem>) {
    this.baseApi = baseApi
  }

  async create(data: ForumItem, token: string): Promise<ForumItem | null> {
    const response = await this.baseApi.upload('/api/foruns/', data, token)

    return response.data as ForumItem
  }

  findQuery(): Promise<ForumItem[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(
    token: string,
    usuario_criacao: number,
    query: string,
    offset: number | null,
    ordering: string,
  ): Promise<ListResponse<ForumItem>> {
    const response = await this.baseApi.getAll(
      `/api/foruns/?usuario_criacao=${
        usuario_criacao || ''
      }&offset=${offset}&search=${query}&ordering=${ordering}`,
      token,
    )

    return response.data
  }

  async findOne(id: string, token: string): Promise<ForumItem> {
    const response = await this.baseApi.getOne(`/api/foruns/${id}`, token)

    return response.data as ForumItem
  }

  async update(): Promise<ForumItem | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<ForumItem | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<ForumItem | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: ForumItem): ForumItem {
    return executionTest
  }

  commandToQuery(executionTest: ForumItem): ForumItem {
    return executionTest
  }
}
