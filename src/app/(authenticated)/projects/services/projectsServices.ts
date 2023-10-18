import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { ListResponse } from '@/types/ListResponse'
import Project from '@/types/Project'

export class ProjectService implements ResourceService<Project, Project> {
  baseApi: IBaseApi<Project, Project>

  constructor(baseApi: IBaseApi<Project, Project>) {
    this.baseApi = baseApi
  }

  async create(
    data: Project,
    token: string,
    onUploadProgress: (data: number) => void,
  ): Promise<Project | null> {
    const response = await this.baseApi.upload(
      '/api/projetos/',
      data,
      token,
      (data) => onUploadProgress(Math.round((100 * data.loaded) / data.total)),
    )

    return response.data as Project
  }

  findQuery(): Promise<Project[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<ListResponse<Project>> {
    const response = await this.baseApi.getAll('/api/projetos/', token)

    return response.data as ListResponse<Project>
  }

  async findOne(id: string, token: string): Promise<Project | null> {
    const response = await this.baseApi.getOne(`/api/projetos/${id}`, token)

    return response.data as Project
  }

  async update(): Promise<Project | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<Project | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<Project | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: Project): Project {
    return executionTest
  }

  commandToQuery(executionTest: Project): Project {
    return executionTest
  }
}
