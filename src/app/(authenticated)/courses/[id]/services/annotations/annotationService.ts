import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { AnnotationItem } from '@/types/Annotation'
import { ListResponse } from '@/types/ListResponse'

export class AnnotationService
  implements ResourceService<AnnotationItem, AnnotationItem>
{
  baseApi: IBaseApi<AnnotationItem, AnnotationItem>

  constructor(baseApi: IBaseApi<AnnotationItem, AnnotationItem>) {
    this.baseApi = baseApi
  }

  async create(
    data: AnnotationItem,
    token: string,
  ): Promise<AnnotationItem | null> {
    const response = await this.baseApi.post('/api/anotacoes/', data, token)

    return response.data as AnnotationItem
  }

  findQuery(): Promise<AnnotationItem[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<ListResponse<AnnotationItem>> {
    const response = await this.baseApi.getAll('/api/anotacoes/', token)

    return response.data
  }

  async findOne(id: string, token: string): Promise<AnnotationItem | null> {
    const response = await this.baseApi.getOne(`/api/anotacoes/${id}`, token)

    return response.data as AnnotationItem
  }

  async update(
    data: AnnotationItem,
    token: string,
  ): Promise<AnnotationItem | null> {
    const response = await this.baseApi.put(
      `/api/anotacoes/${data.id}/`,
      token,
      data,
    )
    return response.data as AnnotationItem
  }

  async delete(id: string, token: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<AnnotationItem | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<AnnotationItem | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: AnnotationItem): AnnotationItem {
    return executionTest
  }

  commandToQuery(executionTest: AnnotationItem): AnnotationItem {
    return executionTest
  }
}
