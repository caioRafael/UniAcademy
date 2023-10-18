import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { FavoriteItem } from '@/types/Favorite'

export class FavoriteService
  implements ResourceService<FavoriteItem, FavoriteItem>
{
  baseApi: IBaseApi<FavoriteItem, FavoriteItem>

  constructor(baseApi: IBaseApi<FavoriteItem, FavoriteItem>) {
    this.baseApi = baseApi
  }

  async create(): Promise<FavoriteItem | null> {
    throw new Error('Method not implemented.')
  }

  findQuery(): Promise<FavoriteItem[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<FavoriteItem> {
    const response = await this.baseApi.getAll(`/api/favoritos-aulas/`, token)

    return response.data as FavoriteItem
  }

  async findOne(id: string, token: string): Promise<FavoriteItem | null> {
    const response = await this.baseApi.getOne(
      `/api/favoritos-aulas/${id}`,
      token,
    )

    return response.data as FavoriteItem
  }

  async update(): Promise<FavoriteItem | null> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string, token: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<FavoriteItem | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<FavoriteItem | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: FavoriteItem): FavoriteItem {
    return executionTest
  }

  commandToQuery(executionTest: FavoriteItem): FavoriteItem {
    return executionTest
  }
}
