import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import Comment from '@/types/Comment'

export class CommentsService implements ResourceService<Comment, Comment> {
  baseApi: IBaseApi<Comment, Comment>

  constructor(baseApi: IBaseApi<Comment, Comment>) {
    this.baseApi = baseApi
  }

  async create(): Promise<Comment | null> {
    throw new Error('Method not implemented.')
  }

  findQuery(): Promise<Comment[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<Comment> {
    const response = await this.baseApi.getAll(`/api/comentarios/`, token)

    return response.data as Comment
  }

  async findOne(id: string, token: string): Promise<Comment | null> {
    const response = await this.baseApi.getOne(`/api/comentarios/${id}`, token)

    return response.data as Comment
  }

  async update(): Promise<Comment | null> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string, token: string): Promise<void> {
    await this.baseApi.delete(`/api/comentarios/${id}`, token)
  }

  async changeSituation(): Promise<Comment | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<Comment | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: Comment): Comment {
    return executionTest
  }

  commandToQuery(executionTest: Comment): Comment {
    return executionTest
  }
}
