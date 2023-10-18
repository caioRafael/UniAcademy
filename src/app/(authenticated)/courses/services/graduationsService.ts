import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import Graduation from '@/types/Graduation'
import { ListResponse } from '@/types/ListResponse'

export class GraduationsService
  implements ResourceService<Graduation, Graduation>
{
  baseApi: IBaseApi<Graduation, Graduation>

  constructor(baseApi: IBaseApi<Graduation, Graduation>) {
    this.baseApi = baseApi
  }

  async create(): Promise<Graduation | null> {
    throw new Error('Method not implemented.')
  }

  findQuery(): Promise<Graduation[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<ListResponse<Graduation>> {
    const response = await this.baseApi.getAll(`/api/categoria-curso/`, token)

    return response.data
  }

  async findOne(id: string, token: string): Promise<Graduation | null> {
    const response = await this.baseApi.getOne(
      `/api/categoria-curso/${id}`,
      token,
    )

    return response.data as Graduation
  }

  async update(): Promise<Graduation | null> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string, token: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<Graduation | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<Graduation | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: Graduation): Graduation {
    return executionTest
  }

  commandToQuery(executionTest: Graduation): Graduation {
    return executionTest
  }
}
