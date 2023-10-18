import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { ClassItem } from '@/types/Class'
import { ListResponse } from '@/types/ListResponse'

export class ClassService implements ResourceService<ClassItem, ClassItem> {
  baseApi: IBaseApi<ClassItem, ClassItem>

  constructor(baseApi: IBaseApi<ClassItem, ClassItem>) {
    this.baseApi = baseApi
  }

  async create(): Promise<ClassItem | null> {
    throw new Error('Method not implemented.')
  }

  findQuery(): Promise<ClassItem[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<ListResponse<ClassItem>> {
    const response = await this.baseApi.getAll('/api/aulas/', token)

    return response.data
  }

  async findOne(id: string, token: string): Promise<ClassItem | null> {
    const response = await this.baseApi.getOne(`/api/aulas/${id}`, token)

    return response.data as ClassItem
  }

  async update(): Promise<ClassItem | null> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string, token: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<ClassItem | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<ClassItem | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: ClassItem): ClassItem {
    return executionTest
  }

  commandToQuery(executionTest: ClassItem): ClassItem {
    return executionTest
  }
}
