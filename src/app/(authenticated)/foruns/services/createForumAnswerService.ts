import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import CreateForumAnswer from '@/types/CreateForumAnswer'
import { ListResponse } from '@/types/ListResponse'

export class CreateForumAnswerService
  implements ResourceService<CreateForumAnswer, CreateForumAnswer>
{
  baseApi: IBaseApi<CreateForumAnswer, CreateForumAnswer>

  constructor(baseApi: IBaseApi<CreateForumAnswer, CreateForumAnswer>) {
    this.baseApi = baseApi
  }

  async create(
    data: CreateForumAnswer,
    token: string,
  ): Promise<CreateForumAnswer | null> {
    const response = await this.baseApi.post(
      '/api/respostas-forum/',
      data,
      token,
    )

    return response.data as CreateForumAnswer
  }

  findQuery(): Promise<CreateForumAnswer[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<ListResponse<CreateForumAnswer>> {
    throw new Error('Method not implemented.')
  }

  async findOne(id: string, token: string): Promise<CreateForumAnswer> {
    throw new Error('Method not implemented.')
  }

  async update(): Promise<CreateForumAnswer | null> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string, token: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<CreateForumAnswer | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<CreateForumAnswer | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: CreateForumAnswer): CreateForumAnswer {
    return executionTest
  }

  commandToQuery(executionTest: CreateForumAnswer): CreateForumAnswer {
    return executionTest
  }
}
