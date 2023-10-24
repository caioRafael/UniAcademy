import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { ForumAnswerItem } from '@/types/ForumAnswers'
import { ListResponse } from '@/types/ListResponse'

export class ForumAnswersService
  implements ResourceService<ForumAnswerItem, ForumAnswerItem>
{
  baseApi: IBaseApi<ForumAnswerItem, ForumAnswerItem>

  constructor(baseApi: IBaseApi<ForumAnswerItem, ForumAnswerItem>) {
    this.baseApi = baseApi
  }

  async create(): Promise<ForumAnswerItem | null> {
    throw new Error('Method not implemented.')
  }

  findQuery(): Promise<ForumAnswerItem[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(
    token: string,
    forum: number,
  ): Promise<ListResponse<ForumAnswerItem>> {
    const response = await this.baseApi.getAll(
      `/api/respostas-forum/?forum=${forum}`,
      token,
    )

    return response.data
  }

  async findOne(id: string, token: string): Promise<ForumAnswerItem | null> {
    const response = await this.baseApi.getOne(`/api/foruns/${id}`, token)

    return response.data
  }

  async update(): Promise<ForumAnswerItem | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<ForumAnswerItem | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<ForumAnswerItem | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: ForumAnswerItem): ForumAnswerItem {
    return executionTest
  }

  commandToQuery(executionTest: ForumAnswerItem): ForumAnswerItem {
    return executionTest
  }
}
