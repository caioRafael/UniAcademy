import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import Favorite from '@/types/Favorite'
import { ListResponse } from '@/types/ListResponse'

export class FavoritesService implements ResourceService<Favorite, Favorite> {
  baseApi: IBaseApi<Favorite, Favorite>

  constructor(baseApi: IBaseApi<Favorite, Favorite>) {
    this.baseApi = baseApi
  }

  async create(): Promise<Favorite | null> {
    throw new Error('Method not implemented.')
  }

  findQuery(): Promise<Favorite[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<ListResponse<Favorite>> {
    const response = await this.baseApi.getAll(`/api/favoritos-aulas/`, token)

    return response.data
  }

  async findOne(id: string, token: string): Promise<Favorite | null> {
    const response = await this.baseApi.getOne(
      `/api/favoritos-aulas/${id}`,
      token,
    )

    return response.data as Favorite
  }

  async update(): Promise<Favorite | null> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string, token: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<Favorite | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<Favorite | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: Favorite): Favorite {
    return executionTest
  }

  commandToQuery(executionTest: Favorite): Favorite {
    return executionTest
  }
}
