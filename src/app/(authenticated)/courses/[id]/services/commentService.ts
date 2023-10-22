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
    const response = await this.baseApi.post('/api/comentarios/', data, token)

    return response.data as CommentItem
  }

  findQuery(): Promise<CommentItem[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(
    token: string,
    offset: number | null,
    classroom: number,
  ): Promise<ListResponse<CommentItem>> {
    const response = await this.baseApi.getAll(
      `/api/comentarios/?offset=${offset}&aula=${classroom}`,
      token,
    )

    return response.data as ListResponse<CommentItem>
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
    await this.baseApi.delete(`/api/comentarios/${id}`, token)
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
