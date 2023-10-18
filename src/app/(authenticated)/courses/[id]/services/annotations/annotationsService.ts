import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import Annotation from '@/types/Annotation'

export class AnnotationsService
  implements ResourceService<Annotation, Annotation>
{
  baseApi: IBaseApi<Annotation, Annotation>

  constructor(baseApi: IBaseApi<Annotation, Annotation>) {
    this.baseApi = baseApi
  }

  async create(): Promise<Annotation | null> {
    throw new Error('Method not implemented.')
  }

  findQuery(): Promise<Annotation[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<Annotation> {
    const response = await this.baseApi.getAll(`/api/anotacoes/`, token)

    return response.data as Annotation
  }

  async findOne(id: string, token: string): Promise<Annotation | null> {
    const response = await this.baseApi.getOne(`/api/anotacoes/${id}`, token)

    return response.data as Annotation
  }

  async update(): Promise<Annotation | null> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string, token: string): Promise<void> {
    await this.baseApi.delete(`/api/anotacoes/${id}`, token)
  }

  async changeSituation(): Promise<Annotation | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<Annotation | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: Annotation): Annotation {
    return executionTest
  }

  commandToQuery(executionTest: Annotation): Annotation {
    return executionTest
  }
}
