import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { CommentItem } from '@/types/Comment'
import { ListResponse } from '@/types/ListResponse'

export class CommentService
  implements ResourceService<CommentItem, CommentItem>
{
  baseApi: IBaseApi<CommentItem, CommentItem>

  constructor(baseApi: IBaseApi<CommentItem, CommentItem>) {
    this.baseApi = baseApi
  }

  async create(data: CommentItem, token: string): Promise<CommentItem | null> {
    const response = await this.baseApi.post(`/api/comentarios/`, data, token)

    return response.data as CommentItem
  }

  findQuery(): Promise<CommentItem[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<ListResponse<CommentItem>> {
    const response = await this.baseApi.getAll(`/api/comentarios/`, token)

    return response.data
  }

  async findOne(id: string, token: string): Promise<CommentItem | null> {
    const response = await this.baseApi.getOne(`/api/comentarios/${id}`, token)

    return response.data as CommentItem
  }

  async update(data: CommentItem, token: string): Promise<CommentItem | null> {
    const response = await this.baseApi.put(
      `/api/comentarios/${data.id}/`,
      token,
      data,
    )
    return response.data as CommentItem
  }

  async delete(id: string, token: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<CommentItem | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<CommentItem | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: CommentItem): CommentItem {
    return executionTest
  }

  commandToQuery(executionTest: CommentItem): CommentItem {
    return executionTest
  }
}
