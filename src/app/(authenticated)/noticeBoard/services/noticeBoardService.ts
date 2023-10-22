import { IBaseApi } from '@/lib/api/IBaseApi'
import { ResourceService } from '@/lib/api/ResourceService'
import { ListResponse } from '@/types/ListResponse'
import { Warning } from '@/types/Warning'

export class NoticeBoardService implements ResourceService<Warning, Warning> {
  baseApi: IBaseApi<Warning, Warning>

  constructor(baseApi: IBaseApi<Warning, Warning>) {
    this.baseApi = baseApi
  }

  findQuery(): Promise<Warning[]> {
    throw new Error('Method not implemented.')
  }

  async findAll(token: string): Promise<ListResponse<Warning>> {
    const response = await this.baseApi.getAll('/api/aviso/', token)
    return response.data
  }

  async findOne(id: string, token: string): Promise<Warning | null> {
    const response = await this.baseApi.getOne(
      `/api/Warnings/?usuario=${id}`,
      token,
    )

    return response.data.results[0]
  }

  async create(
    data: Warning,
    token: string,
    onUploadProgress: (data: number) => void,
  ): Promise<Warning | null> {
    const response = await this.baseApi.upload(
      '/api/aviso/',
      data,
      token,
      (data) => onUploadProgress(Math.round((100 * data.loaded) / data.total)),
    )

    return response.data as Warning
  }

  async update(): Promise<Warning | null> {
    throw new Error('Method not implemented.')
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async changeSituation(): Promise<Warning | null> {
    throw new Error('Method not implemented.')
  }

  async comment(): Promise<Warning | null> {
    throw new Error('Method not implemented.')
  }

  queryToCommand(executionTest: Warning): Warning {
    return executionTest
  }

  commandToQuery(executionTest: Warning): Warning {
    return executionTest
  }
}
