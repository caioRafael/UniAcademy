import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import ClassRoom from '@/types/Classroom'
import { ListResponse } from '@/types/ListResponse'

export class ClassRoomService implements ResourceService<ClassRoom, ClassRoom> {
  baseApi: IBaseApi<ClassRoom, ClassRoom>

  constructor(baseApi: IBaseApi<ClassRoom, ClassRoom>) {
    this.baseApi = baseApi
  }

  async create(data: ClassRoom, token: string): Promise<ClassRoom | null> {
    const response = await this.baseApi.upload('/api/aulas/', data, token)

    return response.data
  }

  findQuery(): Promise<ClassRoom[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(): Promise<ListResponse<ClassRoom>> {
    throw new Error('Method not implemented.')
  }

  async findOne(): Promise<ClassRoom | null> {
    throw new Error('Method not implemented.')
  }

  async update(): Promise<ClassRoom | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<ClassRoom | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<ClassRoom | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: ClassRoom): ClassRoom {
    return executionTest
  }

  commandToQuery(executionTest: ClassRoom): ClassRoom {
    return executionTest
  }
}
