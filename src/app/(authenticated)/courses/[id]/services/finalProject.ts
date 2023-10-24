import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { FinalProject } from '@/types/FinalProject'
import { ListResponse } from '@/types/ListResponse'

export class FinalProjectService
  implements ResourceService<FinalProject, FinalProject>
{
  baseApi: IBaseApi<FinalProject, FinalProject>

  constructor(baseApi: IBaseApi<FinalProject, FinalProject>) {
    this.baseApi = baseApi
  }

  async create(
    data: FinalProject,
    token: string,
  ): Promise<FinalProject | null> {
    const response = await this.baseApi.post(
      '/api/projetos-finais/',
      data,
      token,
    )

    return response.data as FinalProject
  }

  findQuery(): Promise<FinalProject[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<ListResponse<FinalProject>> {
    const response = await this.baseApi.getAll('/api/projetos-finais/', token)

    return response.data as ListResponse<FinalProject>
  }

  async findOne(id: string, token: string): Promise<FinalProject | null> {
    const response = await this.baseApi.getOne(
      `/api/projetos-finais/${id}`,
      token,
    )

    return response.data as FinalProject
  }

  async update(): Promise<FinalProject | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<FinalProject | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<FinalProject | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: FinalProject): FinalProject {
    return executionTest
  }

  commandToQuery(executionTest: FinalProject): FinalProject {
    return executionTest
  }
}
