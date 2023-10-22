import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { ListResponse } from '@/types/ListResponse'
import User from '@/types/User'

export class UserService implements ResourceService<User, User> {
  baseApi: IBaseApi<User, User>

  constructor(baseApi: IBaseApi<User, User>) {
    this.baseApi = baseApi
  }

  findQuery(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(): Promise<ListResponse<User>> {
    throw new Error('Method not implemented.')
  }

  findOne(): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async create(data: User): Promise<User | null> {
    const response = await this.baseApi.post('/api/v1/users/', data)

    return response.data as User
  }

  async update(): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: User): User {
    return executionTest
  }

  commandToQuery(executionTest: User): User {
    return executionTest
  }
}
