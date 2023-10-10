import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import Profile from '@/types/Profile'

export class ProfileService implements ResourceService<Profile, Profile> {
  baseApi: IBaseApi<Profile, Profile>

  constructor(baseApi: IBaseApi<Profile, Profile>) {
    this.baseApi = baseApi
  }

  findQuery(): Promise<Profile[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(arenaId: string, token: string): Promise<Profile[]> {
    throw new Error('Method not implemented.')
  }

  findOne(): Promise<Profile | null> {
    throw new Error('Method not implemented.')
  }

  async create(data: Profile): Promise<Profile | null> {
    const response = await this.baseApi.post('/api/profiles/', data)

    return response.data as Profile
  }

  async update(): Promise<Profile | null> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string, token: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<Profile | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<Profile | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: Profile): Profile {
    return executionTest
  }

  commandToQuery(executionTest: Profile): Profile {
    return executionTest
  }
}
